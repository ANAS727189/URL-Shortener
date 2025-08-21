FROM golang:alpine as builder

RUN apk add --no-cache git

WORKDIR /build
COPY . .
RUN go build -o main .

# Final stage
FROM alpine

# Install Redis + supervisord
RUN apk add --no-cache redis supervisor

# Create app user
RUN adduser -S -D -H -h /app appuser
USER appuser

WORKDIR /app

# Copy Go binary + supervisord config
COPY --from=builder /build/main /app/
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
