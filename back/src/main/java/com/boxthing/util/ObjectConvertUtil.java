package com.boxthing.util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;

public class ObjectConvertUtil {
  public static <T> T jsonConverter(Object object) {
    Gson gson = new Gson();
    Type type = new TypeToken<T>() {}.getType();
    return gson.fromJson(gson.toJson(object), type);
  }
}
