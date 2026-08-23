# Mini CRM — Redesigned

## Run backend
1. Start MySQL and ensure database `crm_db` exists.
2. Check `src/main/resources/application.properties` for your local MySQL username/password.
3. From the `minicrm` backend folder run:
   `./mvnw spring-boot:run` (Linux/macOS)
   `.\mvnw.cmd spring-boot:run` (Windows PowerShell)

Backend: http://localhost:8080

## Run frontend
The frontend is static HTML/CSS/JS and calls the Spring Boot API at `http://localhost:8080/api`.
You can open `frontend/login.html` directly or serve the `frontend` folder with a simple static server.

## Main APIs
- POST /api/auth/register
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/leads
- GET/POST/PUT/DELETE /api/customers
- GET/POST/PUT/DELETE /api/followups
- GET /api/dashboard
- GET /api/reports/summary

Passwords created through registration are BCrypt-hashed. Existing plaintext passwords can still log in once and are upgraded to BCrypt.
