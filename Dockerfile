FROM node:18.0.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine
RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /app/build /usr/share/nginx/html/.