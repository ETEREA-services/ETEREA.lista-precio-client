# Build stage
FROM node:22-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY vite.config.js ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Variables de entorno con valores por defecto
ENV VITE_BACKEND=/api
ENV VITE_PORT=5173

# Exponer el puerto de Vite
EXPOSE ${VITE_PORT}

# Usar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 