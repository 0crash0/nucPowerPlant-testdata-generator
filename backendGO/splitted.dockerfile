FROM golang:alpine AS build
WORKDIR /build
COPY . ./
RUN go mod download
ENV GOOS=linux GARCH=amd64 CGO_ENABLED=0
RUN go build -o /main



FROM alpine:latest
WORKDIR /
COPY --from=build /main /main

ENV PORT=8890
ENV backend_prefix=""

EXPOSE 8890 $PORT

ENTRYPOINT ["/main"]