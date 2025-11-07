# Student Grievance Portal

Full-stack app with React (Vite) frontend, Spring Boot backend, and PostgreSQL (manage with pgAdmin 4).

Note: Passwords are stored in plain text per your request. This is insecure and only suitable for demos.

## Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 18+
- PostgreSQL 14+ (or compatible) and pgAdmin 4

## Backend Setup (Spring Boot)
1. Create a database in Postgres (via pgAdmin 4 or psql):
   ```sql
   CREATE DATABASE student_grievance_db;
   ```
2. Update `backend/src/main/resources/application.properties` if your Postgres username/password differ:
   ```
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```
3. Run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Backend runs on `http://localhost:8080`.
   - Seeded admin user is created on first run:
     - Email: `admin@portal.com`
     - Password: `admin123`

### API Endpoints
- POST `/api/auth/register` — body: `{ fullName, email, password }` — registers a student
- POST `/api/auth/login` — body: `{ email, password }` — returns `{ id, fullName, email, role }`

CORS is enabled for `http://localhost:5173` and `http://localhost:3000` by default.

## Frontend Setup (React + Vite)
1. Install deps and run dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. App opens at `http://localhost:5173`.

### Demo Accounts
- Admin: `admin@portal.com` / `admin123`
- Register any number of students on the Register page.

## Project Structure
- `backend/` — Spring Boot project
  - Entities: `User` with `Role` (STUDENT, ADMIN)
  - Endpoints: register/login
  - Data seeder creates single admin if none exists
- `frontend/` — Vite React app
  - Pages: Login, Register, Student Dashboard, Admin Dashboard
  - Simple role-based routing; user kept in `localStorage`

## Notes & Next Steps
- For production, add proper hashing (bcrypt/argon2), real sessions/JWT, and a full grievance model/workflow.
- Add CRUD for grievances, admin actions, and student status tracking.
- Add input sanitation, rate limiting, and improved error handling.




