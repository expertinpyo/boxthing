package com.boxthing.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import org.springframework.stereotype.Component;

@Component
public class ObjectConvertUtil {
  private final Gson gson = new Gson();

  public <T> T ObjectConverter(Object object) {
    Type type = new TypeToken<T>() {}.getType();
    return gson.fromJson(gson.toJson(object), type);
  }
}
