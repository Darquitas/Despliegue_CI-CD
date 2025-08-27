# Dockerfile para order-service
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3002
CMD ["node", "services/order-service/src/server.js"]
