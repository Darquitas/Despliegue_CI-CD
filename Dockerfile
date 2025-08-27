# Dockerfile para el API Gateway
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3004
CMD ["node", "gateway.js"]
