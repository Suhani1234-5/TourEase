# Stage 1 Docker 
FROM node:22-alpine AS builder 

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# 1. Catch the variable from docker-compose.yml
ARG VITE_API_URL
# 2. Expose it to the Node/Vite process during compilation
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build 

# Stage 2 Docker
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]