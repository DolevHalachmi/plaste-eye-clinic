# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests -q

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /build/target/dr-halachmi-clinic-0.0.1-SNAPSHOT.jar app.jar

# Default local port. Render overrides this with its own PORT env var.
ENV PORT=8080

# Expose the default local port for documentation/local container runs.
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD sh -c 'wget --no-verbose --tries=1 --spider "http://127.0.0.1:${PORT}/actuator/health" || exit 1'

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
