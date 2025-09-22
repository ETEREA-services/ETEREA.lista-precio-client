# Etapa 1: Construir la aplicación de React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# La variable de entorno VITE_BACKEND es necesaria durante la compilación
# para que el código de React sepa a qué endpoint llamar.
ARG VITE_BACKEND=/api
ENV VITE_BACKEND=${VITE_BACKEND}
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.25-alpine
# Copiar los archivos estáticos construidos de la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar la configuración personalizada de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto 80, que es el que Nginx escucha por defecto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]