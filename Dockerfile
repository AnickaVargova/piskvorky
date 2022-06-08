FROM node:18.0.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG player=X
ARG background=#ffffb3
ARG size=10
RUN rm .env && echo -e "\
REACT_APP_FIRST_PLAYER=${player} \n \
REACT_APP_BACKGROUND=${background} \n \
REACT_APP_SIZE=${size}" > .env
RUN npm run build

FROM nginx:1.21.6-alpine
RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /app/build /usr/share/nginx/html/.