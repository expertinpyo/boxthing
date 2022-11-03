package com.boxthing.util;

import com.boxthing.config.GoogleConfig;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class AccessTokenRefresh {

  private final GoogleConfig googleConfig;
  InputStream in = null;

  public void getAccessToken(String refreshToken) throws IOException {
    URL obj = null;
    String json = "";

    log.info("{}", googleConfig.getClient_secret());
    //    String id = URLEncoder.encode(googleConfig.getClient_id(), "UTF-8");
    //    String secret = URLEncoder.encode(googleConfig.getClient_secret(), "UTF-8");
    //    String refresh = URLEncoder.encode(refreshToken, "UTF-8");
    //    String token = URLEncoder.encode("refresh_token", "UTF-8");
    //
    //    Map<String, Object> params = new HashMap<String, Object>();
    //    params.put("client_id", id);
    //    params.put("client_secret", secret);
    //    params.put("grant_type", token);
    //    params.put("refresh_token", refresh);
    //
    //    StringBuilder postData = new StringBuilder();
    //    for (Map.Entry<String, Object> param : params.entrySet()) {
    //      if (postData.length() != 0) postData.append('&');
    //      postData.append(param.getKey());
    //      postData.append('=');
    //      postData.append(param.getValue());
    //    }
    //    byte[] postDataBytes = postData.toString().getBytes("UTF-8");
    //
    //    obj = new URL("https://oauth2.googleapis.com/token");

    //    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
    //    con.setRequestMethod("POST");
    //    con.setRequestProperty("Content-Length", String.valueOf(postDataBytes.length));
    //    con.setDoOutput(true);
    //    con.getOutputStream().write(postDataBytes);
    //
    //    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(),
    // "UTF-8"));
    //    String inputLine;
    //    StringBuffer response = new StringBuffer();
    //    while ((inputLine = in.readLine()) != null) {
    //      response.append(inputLine);
    //    }
    //    in.close();
    //
    //    json = response.toString();
  }
}
