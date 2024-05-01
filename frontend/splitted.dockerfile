FROM node:20-alpine as build
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the code
COPY . .
RUN npm run build



FROM nginx:stable-alpine
MAINTAINER Saprin Alexey
LABEL version="0.0.1"

COPY --from=build /app/build/static/ /usr/share/nginx/html
COPY --from=build /app/build/* /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80 $PORT


CMD ["nginx", "-g", "daemon off;"]