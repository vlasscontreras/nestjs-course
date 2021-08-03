<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A task management app made with NestJS.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

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

## Course Notes

### NestJS Modules

- Each application has ar leat one module – the root module. That is the starting point of the application
- Modules are an effective way to organize components by a closely related set of capabilities (e.g. per feature)
- It is a good practice to have a folder per module, containing the module's components
- Modules are **singletons**, therefore, a module can be imported by multople other modules

A module is defined by annotating a class with the `@Module` decorator. The decorator provides metadata that NestJS uses to organize the application structure.

```ts
@Module()
export class AppModule {}
```

#### Properties

- **`providers`:** Array of providers to be available within the module via dependency injection
- **`controllers`:** Array of controllers to be instantiated within the module
- **`exports`:** Array of providers to export to other modules
- **`imports`:** List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection

Example:

```ts
@Module({
  providers: [ForumService],
  controllers: [ForumController],
  imports: [
    PostModule,
    CommentModule,
    AuthModule
  ],
  exports: [
    ForumService
  ]
})
export class ForumModule {}
```
