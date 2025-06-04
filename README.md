# <p align="center">Esmana Project</p>

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

</div>

## Development Environment

Start the development environment with:

```bash
docker-compose up --build
```

Stop the development environment with:

```bash
docker-compose down
```

Use ngrok to test webhooks
```bash
ngrok http 8080
```

## Project Structure

- **Frontend**: React application with custom webpack configuration
  - Development server with hot reloading
  - Production build with optimizations (code splitting, tree shaking, etc.)
  - SVG handling as React components
  - See [frontend/README.md](frontend/README.md) for more details

- **Backend**: NestJS application
  - RESTful API
  - MySQL database
  - Redis for caching

## Docker Configuration

Docker is used exclusively for the development environment:

- Frontend development server with hot reloading
- Backend NestJS server with auto-restart
- MySQL database for local development

For production, the frontend is deployed as a static build.

## Local Development

For local development without Docker, see the README files in the respective directories:
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)
