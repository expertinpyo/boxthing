package com.boxthing.util;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GsonUtil {
  private static String PATTERN_DATE = "yyyy-MM-dd";
  private static String PATTERN_TIME = "HH:mm:ss";
  public static String PATTERN_DATETIME = String.format("%s %s", PATTERN_DATE, PATTERN_TIME);

  public static class LocalDateTimeAdapter extends TypeAdapter<LocalDateTime> {
    DateTimeFormatter format = DateTimeFormatter.ofPattern(PATTERN_DATETIME);

    @Override
    public void write(JsonWriter out, LocalDateTime value) throws IOException {
      if (value != null) {
        out.value(value.format(format));
      }
    }

    @Override
    public LocalDateTime read(JsonReader in) throws IOException {
      return LocalDateTime.parse(in.nextString(), format);
    }
  }
}
