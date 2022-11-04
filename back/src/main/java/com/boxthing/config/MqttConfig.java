package com.boxthing.config;

import com.boxthing.mqtt.dto.MqttReqDto.MqttRequestDto;
import com.boxthing.mqtt.handler.InitHandler;
import com.boxthing.mqtt.handler.MqttInboundHandler;
import com.boxthing.mqtt.handler.PostureLogHandler;
import com.boxthing.mqtt.handler.WaterLogHandler;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.MessagingGateway;
import org.springframework.integration.core.MessageSelector;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.integration.transformer.GenericTransformer;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.handler.annotation.Header;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class MqttConfig {
  private final InitHandler inItHandler;
  private final MqttInboundHandler inboundHandler;
  private final WaterLogHandler waterLogHandler;
  private final PostureLogHandler postureLogHandler;
  private final MqttProperties mqttProperties;
  private static final String OUTBOUND_CHANNEL = "outboundChannel";
  private final Gson gson = new Gson();

  @Bean
  public MqttPahoClientFactory mqttPahoClientFactory() {
    MqttConnectOptions options = new MqttConnectOptions();
    options.setServerURIs(new String[] {mqttProperties.getBROKER_URL()});
    DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
    factory.setConnectionOptions(options);

    return factory;
  }

  @Bean
  public IntegrationFlow mqttInboundFlow() {
    return IntegrationFlows.from(mqttInboundChannelAdapter())
        .transform(mqttRequestTransformer())
        .filter(mqttRequestFilter())
        .<MqttRequestDto<Object>, String>route(
            MqttRequestDto::getType,
            mapping ->
                mapping
                    //                    .subFlowMapping("register", sf ->
                    // sf.handle(inItHandler.registerHandler()))
                    .subFlowMapping("init", sf -> sf.handle(inItHandler.bootHandler()))
                    .subFlowMapping("qr", sf -> sf.handle(inboundHandler.qrHandler()))
                    .subFlowMapping("disconnect", sf -> sf.handle(inboundHandler.logoutHandler()))
                    .subFlowMapping(
                        "access_token", sf -> sf.handle(inboundHandler.accessTokenHandler()))
                    .subFlowMapping(
                        "waterlog_create", sf -> sf.handle(waterLogHandler.waterCreatHandler()))
                    .subFlowMapping("waterlog", sf -> sf.handle(waterLogHandler.waterHandler()))
                    .subFlowMapping(
                        "waterlog_today", sf -> sf.handle(waterLogHandler.waterTodayHandler()))
                    .subFlowMapping(
                        "posturelog_create",
                        sf -> sf.handle(postureLogHandler.postureCreateHandler()))
                    .subFlowMapping(
                        "posturelog", sf -> sf.handle(postureLogHandler.postureHandler()))
                    .defaultOutputChannel("errorChannel")
                    .resolutionRequired(false))
        .get();
  }

  private GenericTransformer<String, MqttRequestDto<Object>> mqttRequestTransformer() {
    return new GenericTransformer<String, MqttRequestDto<Object>>() {
      @Override
      public MqttRequestDto<Object> transform(String payload) {
        Type type = new TypeToken<MqttRequestDto<Object>>() {}.getType();
        return gson.fromJson(payload, type);
      }
    };
  }

  private MessageSelector mqttRequestFilter() {
    return new MessageSelector() {
      @Override
      public boolean accept(Message<?> message) {
        MqttRequestDto requestDto = (MqttRequestDto) message.getPayload();
        log.info("serialNumber : {}", requestDto.getDeviceId());
        if (requestDto.getDeviceId() == null) {
          return false;
        }
        return true;
        // TODO: deviceId가 우리 db에 있는지 검증
      }
    };
  }

  public MqttPahoMessageDrivenChannelAdapter mqttInboundChannelAdapter() {
    MqttPahoMessageDrivenChannelAdapter adapter =
        new MqttPahoMessageDrivenChannelAdapter(
            MqttAsyncClient.generateClientId(),
            mqttPahoClientFactory(),
            mqttProperties.getBASE_TOPIC());
    adapter.setCompletionTimeout(5000);
    adapter.setConverter(new DefaultPahoMessageConverter());
    adapter.setQos(1);
    return adapter;
  }

  @Bean
  public IntegrationFlow mqttOutboundFlow() {
    return IntegrationFlows.from(OUTBOUND_CHANNEL).handle(mqttOutboundHandler()).get();
  }

  private MessageHandler mqttOutboundHandler() {
    MqttPahoMessageHandler handler =
        new MqttPahoMessageHandler(MqttAsyncClient.generateClientId(), mqttPahoClientFactory());
    handler.setDefaultQos(1);
    return handler;
  }

  @MessagingGateway(defaultRequestChannel = OUTBOUND_CHANNEL)
  public static interface MqttOutboundGateway {
    @Gateway
    void publish(@Header(MqttHeaders.TOPIC) String topic, String data);
  }
}
