package com.boxthing.util;

import com.google.gson.Gson;
import java.lang.reflect.Type;

public class UtilMethods {
  public static <T> T jsonConverter(Object object, Type type) {
    Gson gson = new Gson();
    return gson.fromJson(gson.toJson(object), type);
  }
}
