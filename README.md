# Einsatz

Einsatz is an incident-tracking web application with an Angular frontend and a Spring Boot REST API. The repository includes a Docker Compose setup for running the frontend, backend, and PostgreSQL database together.

## Tech stack

- **Frontend:** Angular, TypeScript, Angular Material
- **Backend:** Java 21, Spring Boot 3.5, Spring Security, Spring Data JPA
- **Database:** PostgreSQL 16
- **Authentication:** JWT
- **Local orchestration:** Docker Compose

## Run locally

1. Install Docker Engine or Docker Desktop with Docker Compose.
2. Create a root `.env` file for the variables referenced by `docker-compose.yml`. Configure `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and a strong `JWT_SECRET`.
3. Start the stack:

   ```bash
   docker compose up --build
   ```

4. Open the frontend at [http://localhost:4200](http://localhost:4200). The backend is exposed on port `8080`; PostgreSQL uses port `5432`.

Do not commit your `.env` file or real credentials. The Compose configuration is intended for local development; review database migration, secrets, and deployment settings before using it in production.

## Repository layout

- `einsatz-backend/` — Spring Boot API
- `einsatz-frontend/` — Angular application
- `docker-compose.yml` — local multi-service environment

## Development

Backend dependencies are managed with Maven. Frontend dependencies are managed with npm; from `einsatz-frontend/`, run `npm install`, then `npm start` for the Angular development server or `npm run build` to build the app.