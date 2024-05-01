FROM golang:alpine AS build
WORKDIR /build
COPY ./backendGO/. ./
RUN go mod download
ENV GOOS=linux GARCH=amd64 CGO_ENABLED=0
RUN go build -o /main


FROM node:20-alpine as buildFrontend
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY ./frontend/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the code
COPY ./frontend/. .
RUN npm run build


FROM alpine:latest
WORKDIR /
COPY --from=build /main /main
COPY --from=buildFrontend /app/build/. /build/.

ENV PORT=8890
ENV backend_prefix=""

EXPOSE 8890 $PORT

ENTRYPOINT ["/main"]