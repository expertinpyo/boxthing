FROM openjdk:17-jdk-alpine
COPY . /code
WORKDIR /code
RUN chmod +x ./gradlew
RUN --mount=type=cache,target=/root/.gradle ./gradlew clean bootJar
RUN cp ./build/libs/*SNAPSHOT.jar ./app.jar
