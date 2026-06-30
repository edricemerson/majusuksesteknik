# build stage
FROM golang:1.26-alpine AS builder
WORKDIR /app

# looking dependencies
COPY go.mod go.sum ./
RUN go mod download

# copy source and building backend
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# run stage
FROM alpine:latest
WORKDIR /app

#
RUN apk --no-cache add ca-certificates

COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]