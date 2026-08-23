# Mini CRM – Client Lead Management System

A full-stack **Client Lead Management System (CRM)** developed to help organizations manage leads, customers, employees, follow-ups, and sales activities in one centralized system.

The application provides separate functionality for **Admin** and **Employee** users with a dashboard for monitoring CRM activities.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration
* User login
* Role-based access
* Admin and Employee roles
* Session-based user information
* Secure database-backed authentication

### 📊 Dashboard

The dashboard provides an overview of CRM activities, including:

* Total leads
* New leads
* Converted leads
* Follow-up information
* Customer statistics
* CRM activity overview

### 👥 Lead Management

Users can:

* Add new leads
* View all leads
* Update lead information
* Track lead status
* Assign leads to employees
* Manage lead sources
* Convert leads into customers

### 👤 Customer Management

The customer module allows users to:

* Add customers
* View customers
* Update customer information
* Delete customers
* Manage customer details

### 📅 Follow-Up Management

Users can:

* Schedule follow-ups
* View upcoming follow-ups
* Add follow-up notes
* Update follow-up status
* Track customer interactions

### 📈 Reports

The reports module provides CRM information such as:

* Lead statistics
* Conversion statistics
* Employee-related information
* Customer information
* Follow-up information

### 👨‍💼 Admin Features

Administrators can:

* Manage employees
* Manage leads
* View customers
* Monitor CRM activities
* View dashboard statistics
* Access reports

### 👨‍💻 Employee Features

Employees can:

* View assigned leads
* Update lead status
* Manage customers
* Schedule follow-ups
* Add follow-up notes
* Track their assigned activities

---

# 🛠️ Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Local Storage / Session Storage
* Responsive UI

## Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

## Database

* MySQL

## Development Tools

* Visual Studio Code / Spring Tool Suite
* MySQL Workbench
* Git
* GitHub

---

# 🏗️ Project Architecture

```text
                    Mini CRM
                       |
          +------------+------------+
          |                         |
          v                         v
      Frontend                  Backend
   HTML/CSS/JS                Spring Boot
          |                         |
          |       REST APIs         |
          +------------->-----------+
                                    |
                                    v
                               MySQL Database
```

---

# 📁 Project Structure

```text
minicrm/
│
├── .mvn/
│
├── frontend/
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── leads.html
│   ├── customers.html
│   ├── followups.html
│   ├── reports.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── login.js
│       ├── signup.js
│       ├── dashboard.js
│       ├── leads.js
│       ├── customers.js
│       ├── followups.js
│       └── reports.js
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── crm/
│   │   │           └── minicrm/
│   │   │               ├── controller/
│   │   │               ├── entity/
│   │   │               ├── repository/
│   │   │               └── MinicrmApplication.java
│   │   │
│   │   └── resources/
│   │       └── application.properties
│
├── pom.xml
├── mvnw
├── mvnw.cmd
├── .gitignore
└── README.md
```

> The exact package and file names may vary depending on the current project structure.

---

# 🗄️ Database

The application uses **MySQL** as the database.

Example local database:

```text
Database Name:
crm_db
```

The database contains information related to:

* Users
* Leads
* Customers
* Follow-ups
* Other CRM records

Spring Boot uses **Spring Data JPA / Hibernate** to communicate with MySQL.

---

# ⚙️ Configuration

Database credentials should **not be hardcoded in a public GitHub repository**.

The application uses environment variables:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

For local development, configure:

```text
DB_URL=jdbc:mysql://localhost:3306/crm_db
DB_USERNAME=lokesh
DB_PASSWORD=YOUR_PASSWORD
```

For production deployment, configure the environment variables provided by the cloud database service.

---

# 💻 Running the Project Locally

## Prerequisites

Install:

* Java 21 or compatible Java version
* MySQL
* Git
* Maven (optional because Maven Wrapper is included)

---

## 1. Clone the Repository

```bash
git clone https://github.com/lokeshyerra45/FUTURE_FS_02.git
```

Move into the project:

```bash
cd FUTURE_FS_02
```

---

## 2. Create MySQL Database

Open MySQL Workbench or MySQL command line and create:

```sql
CREATE DATABASE crm_db;
```

---

## 3. Configure Database Environment Variables

Set:

```text
DB_URL=jdbc:mysql://localhost:3306/crm_db
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

Do not commit your real password to GitHub.

---

## 4. Start Spring Boot

On Windows:

```cmd
mvnw.cmd spring-boot:run
```

Or:

```cmd
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
https://abundant-liberation-production-825e.up.railway.app
```

---

# 🔌 API Endpoints

The backend provides REST APIs for communication between the frontend and backend.

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

## Leads

Lead APIs are used to:

* Create leads
* Retrieve leads
* Update leads
* Delete leads
* Manage lead status
* Assign leads

Example:

```http
GET /api/leads
```

## Customers

Customer APIs are used to:

* Create customers
* Retrieve customers
* Update customers
* Delete customers

## Follow-Ups

Follow-up APIs are used to:

* Create follow-ups
* Retrieve follow-ups
* Update follow-ups
* Manage follow-up information

> API paths may vary depending on the current backend controller implementation.

---

# 🔄 Application Workflow

## User Registration

```text
User
 ↓
Registration Form
 ↓
Frontend JavaScript
 ↓
POST /api/auth/register
 ↓
Spring Boot
 ↓
UserRepository
 ↓
MySQL
```

## User Login

```text
User
 ↓
Login Form
 ↓
Frontend JavaScript
 ↓
POST /api/auth/login
 ↓
Spring Boot
 ↓
MySQL
 ↓
Authentication Result
 ↓
Dashboard
```

## Lead Management

```text
Employee/Admin
      ↓
Lead Form
      ↓
Frontend
      ↓
REST API
      ↓
Spring Boot
      ↓
JPA / Hibernate
      ↓
MySQL
```

---

# 🔐 Security Considerations

The project uses environment variables for sensitive database configuration.

Never commit:

```text
Passwords
API Keys
Secret Keys
Database Credentials
.env files containing secrets
```

For production, authentication and authorization should be strengthened with industry-standard security mechanisms such as:

* Spring Security
* Password hashing
* JWT authentication
* Role-based authorization
* HTTPS
* Input validation

---

# 🌐 Deployment

The application can be deployed using separate services for each layer.

Recommended architecture:

```text
                    Internet
                       |
                       v
              +----------------+
              |    Frontend    |
              | Vercel/Netlify |
              +-------+--------+
                      |
                      | REST API
                      v
              +----------------+
              | Spring Boot API|
              | Render/Railway |
              +-------+--------+
                      |
                      v
              +----------------+
              | Cloud MySQL    |
              |   Database     |
              +----------------+
```

After deployment, the frontend must use the public Spring Boot API URL instead of:

```text
http://localhost:8080
```

For example:

```javascript
fetch("https://your-backend-url/api/leads")
```

---

# 📱 Accessibility

Once deployed, the CRM can be accessed from:

* Desktop
* Laptop
* Mobile
* Tablet

using the public application URL.

Authentication ensures that only authorized users can access CRM functionality.

---

# 📌 Future Improvements

Possible future enhancements include:

* Spring Security
* JWT authentication
* Password encryption
* Email notifications
* Advanced analytics
* Charts and graphs
* Export reports to PDF/Excel
* Search and filtering
* Pagination
* Activity logs
* Cloud deployment
* Responsive mobile UI
* Automated testing
* Docker support

---

# 🎯 Project Objective

The main objective of this project is to develop a centralized CRM platform that simplifies lead management, customer management, employee assignment, follow-ups, and reporting.

The system demonstrates full-stack application development using:

```text
HTML + CSS + JavaScript
          +
      Spring Boot
          +
        MySQL
```

---

# 👨‍💻 Developer

**Lokesh Yerra**

Full Stack Developer

### Technologies

```text
Java
Spring Boot
MySQL
HTML
CSS
JavaScript
Git
GitHub
```

---
