# Backend Assignment -  Role-Based Access Control (RBAC) Implementation with Google Authentication and JWT

This repository contains the backend implementation for the assignment. It provides functionality for user authentication, JWT token generation and validation, and other key features necessary for handling backend requests in a web application. The backend is built using **Spring Boot** and relies on **JWT** (JSON Web Token) for secure API authorization.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [How to Use](#how-to-use)
- [Enhancements](#enhancements)

## Installation

To get started with this project, follow these steps:

### Prerequisites

Ensure that you have the following installed:
- **Java 11 or later** (for building and running the project)
- **Maven** (for project management and dependency handling)
- **Postman** (for testing API endpoints)
- **Node** (for frontend implementation - React framework)

### Clone the Repository

```bash
git clone https://github.com/priyankak3/Backend-assignment.git
cd Backend-assignment
```

### Configure Environment Variables
For JWT Authentication and Google OAuth:
```bash
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### Build the Project
- Use Maven to build the project:
```bash
mvn clean install
mvn spring-boot:run

npm init
npm start  # For Node.js
```
The application will start on http://localhost:8081


## Tech stack
This project uses the following technologies:

- Java 8 - Programming language used for backend logic.
- Spring Boot - Framework for building REST APIs and managing dependencies.
- Spring Security - For handling authentication and authorization.
- JWT (JSON Web Tokens) - For secure, stateless user authentication.
- Maven - Build tool for managing project dependencies.
- MongoDB - For storaging user information (database).
  
## Project Structure
```
Backend-assignment/
├── src/main/java
│   └── net/engineeringdigest/journalApp
│       ├── controller          # REST controllers for handling requests
│       ├── filter              # Filters for JWT validation and user authentication
│       ├── model               # Models for the application (e.g., User)
│       ├── repository          # Repositories for database interaction
│       ├── security            # Configuration for security (JWT filters, authentication)
│       ├── service             # Business logic and services
│       └── util                # Utility classes like JwtUtil
│   
├── src/main/resources
│   └── application.properties  # Application configuration file
│
└── pom.xml                     # Maven project file
```
## API Endpoints
1. Public:
   - Sign Up: POST /public/signup – Allows users to register.
   - Login: POST /public/login – Allows users to log in and obtain a JWT token.
2. Admin:
   - Get All Users: GET /admin/users – Admin can fetch a list of all users in the system.
   - Create-admin : POST /admin/create-admin-user - Admin can add new users with ADMIN access.

## How to Use
1. Authenticate User:
First, send a POST request to /authenticate with the username and password. This will return a JWT token.

2. Access Protected Routes:
Use the JWT token to access any protected routes by passing it in the Authorization header as Bearer <your-jwt-token>.
Once the application is running, you can interact with the API using tools like Postman or Insomnia.

## Enhancements
### 1. Granular Role-Based Access Control (RBAC)
Enhancement: The application uses RBAC to assign users different roles (e.g., Admin, Moderator, User). Based on the user's role, different permissions are granted to access protected routes.

### 2. Session Expiry and Forced Logout
Enhancement: To prevent session hijacking, users will be logged out after a defined period of inactivity.


## Screen Shots of the website

### Basic LOGIN PAGE
<img width="1366" alt="Screen Shot 2024-12-01 at 6 25 43 PM" src="https://github.com/user-attachments/assets/21997138-90a4-4ece-8f79-1f05c79a90bb">

### ADMIN LOGIN
<img width="1344" alt="Screen Shot 2024-12-01 at 6 21 59 PM" src="https://github.com/user-attachments/assets/be933f85-435e-479a-961c-61c46e1e2f0e">

### USER LOGIN
<img width="1362" alt="Screen Shot 2024-12-01 at 6 26 42 PM" src="https://github.com/user-attachments/assets/74724c6d-bf12-4d73-9c97-7c7d88dc7cfe">
