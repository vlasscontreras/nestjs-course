# NestJS Course

## Application Structure (Long Term)

- AppModule (root)
  - TasksModule
    - TasksController
    - TaskEntity
    - TasksService
    - TaskRepository
    - StatusValidationPipe
  - AuthModule
    - AuthController
    - UserRepository
    - AuthService
    - JwtStrategy
    - UserEntity

## Course Objectives

### NestJS

- Understand modules
- Understand controllers
- Understand services and providers
- Understand controller-to-service communication
- Validation using pipes

### Backend and Architecture

- Develop production-ready REST APIs
- CRUD operations
- Error handling
- Data Transfer Objects (DTO)
- System modularity
- Backend development best practices
- Configuration management
- Logging
- Security best practices

### Persistence

- Connecting the application to a database
- Working with relational databases
- Using TypeORM
- Writing simple and complex queries using QueryBuilder
- Performance when working with the database

### Auth

- Signing up and signing in
- Authentication and authorization
- Protected resources
- Ownership of tasks by users
- Using JWT tokens (JSON Web Tokens)
- Password hashing, salts, and properly storing passwords

### Deployment

- Publishing the application for production use
- Deploying NestJS apps to AWS
- Deploying frontend applications to Amazon S3
- Wiring up the frontend and backend

## Specifications

### API Endpoints

#### Tasks

| Endpoint            | Method   | Description               |
| ------------------- | -------- | ------------------------- |
| `/tasks`            | `GET`    | Get tasks (incl. filters) |
| `/tasks/:id`        | `GET`    | Get a task                |
| `/tasks`            | `POST`   | Create a task             |
| `/tasks/:id/status` | `DELETE` | Delete a task             |
| `/tasks/:id/status` | `PATCH`  | Update task status        |

#### Auth

| Endpoint       | Method | Description |
| -------------- | ------ | ----------- |
| `/auth/signup` | `POST` | Sign up     |
| `/auth/signin` | `POST` | Sign in     |
