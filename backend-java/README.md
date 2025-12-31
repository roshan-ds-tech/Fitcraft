# Fitcraft Backend - Java Spring Boot

This is the Java Spring Boot backend for the Fitcraft application, replacing the Django backend.

## Features

- User authentication (signup, login, logout)
- JWT-based authentication
- User profile management
- RESTful API endpoints
- SQLite database
- CORS enabled for frontend integration

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-java
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The server will start on `http://localhost:8000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Request body: `{ "fullName": "John Doe", "email": "john@example.com", "password": "password123" }`
  - Response: `{ "message": "Signup successful", "token": "jwt_token" }`

- `POST /api/auth/login` - Login user
  - Request body: `{ "email": "john@example.com", "password": "password123" }`
  - Response: `{ "message": "Login successful", "token": "jwt_token" }`

- `POST /api/auth/logout` - Logout user (requires authentication)
  - Response: `{ "message": "Logged out", "token": null }`

- `GET /api/auth/session` - Get current session info
  - Response: `{ "authenticated": true, "profile": {...} }` or `{ "authenticated": false, "profile": null }`

### Profile

- `GET /api/auth/profile` - Get user profile (requires authentication)
  - Response: Profile object with user details

- `PATCH /api/auth/profile` - Update user profile (requires authentication)
  - Request body: `{ "fullName": "John Doe", "bio": "...", "gender": "Male", "age": 25, "heightCm": 180, "weightKg": 75 }`
  - Response: Updated profile object

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After login or signup, include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database

The application uses SQLite database (`fitcraft.db`) which will be created automatically on first run.

## Configuration

Edit `src/main/resources/application.properties` to configure:
- Server port (default: 8000)
- Database settings
- JWT secret and expiration
- CORS allowed origins

## Development

To run in development mode with hot reload:
```bash
mvn spring-boot:run
```

The application will automatically reload when you make changes (thanks to Spring Boot DevTools).

