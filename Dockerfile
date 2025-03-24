# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/ ./src/
COPY tests/ ./tests/
RUN npm run lint && npm test

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src/ ./src/
EXPOSE 3000
CMD ["npm", "start"]