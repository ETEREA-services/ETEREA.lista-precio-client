# ETEREA Lista Precio Client

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat&logo=bootstrap)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

Cliente React para la gestión y visualización de listas de precios en el ecosistema de microservicios Eterea.

## Descripción

Esta aplicación es un cliente frontend desarrollado en React que permite a los usuarios visualizar y gestionar listas de precios de artículos organizados por rubros. Forma parte del ecosistema de microservicios Eterea, integrándose con servicios backend para obtener datos de artículos y rubros.

## Características

- **Visualización por Rubros**: Muestra artículos organizados por categorías con paginación automática
- **Interfaz Moderna**: Construida con React, Bootstrap y Vite para una experiencia de usuario fluida
- **Integración con Microservicios**: Conecta con servicios de artículos y rubros a través de APIs REST
- **Despliegue en Contenedores**: Configurado para despliegue con Docker y Nginx
- **CI/CD**: Pipeline automatizado con GitHub Actions para construcción y despliegue

## Tecnologías

- **Frontend**: React 18, Vite
- **UI**: Bootstrap 5, Bootstrap Icons
- **HTTP Client**: Axios
- **Contenedor**: Docker, Nginx
- **CI/CD**: GitHub Actions

## Instalación y Uso

### Desarrollo Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ETEREA-services/eterea.lista-precio-client.git
   cd eterea.lista-precio-client
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura variables de entorno (opcional):
   Crea un archivo `.env` con:
   ```
   VITE_BACKEND=http://localhost:8252/api
   ```

4. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

### Despliegue con Docker

1. Construye la imagen:
   ```bash
   docker build -t eterea-lista-precio-client .
   ```

2. Ejecuta el contenedor:
   ```bash
   docker run -p 80:80 eterea-lista-precio-client
   ```

   La aplicación estará disponible en `http://localhost`

## Arquitectura

La aplicación se conecta con los siguientes servicios del ecosistema Eterea:

- **Servicio de Artículos**: Proporciona datos de productos
- **Servicio de Rubros**: Gestiona categorías de productos
- **Servicio de Discovery**: Registro y descubrimiento de servicios (Consul)

## Documentación

La documentación completa, incluyendo diagramas de arquitectura, flujo de peticiones y estado de la aplicación, se genera automáticamente y está disponible en [GitHub Pages](https://eterea-services.github.io/eterea.lista-precio-client/).

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Add nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Versión

Versión actual: 1.0.0
