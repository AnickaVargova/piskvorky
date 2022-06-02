FROM node:18.0.0-alpine
WORKDIR /app
RUN cd /app
COPY . .
COPY package*.json ./
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]

