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

- Each application has ar leat one module – the root module. That is the starting point of the application.
- Modules are an effective way to organize components by a closely related set of capabilities (e.g. per feature).
- It is a good practice to have a folder per module, containing the module's components.
- Modules are **singletons**, therefore, a module can be imported by multople other modules.

A module is defined by annotating a class with the `@Module` decorator. The decorator provides metadata that NestJS uses to organize the application structure.

```ts
@Module()
export class AppModule {}
```

#### Properties

- **`providers`:** Array of providers to be available within the module via dependency injection.
- **`controllers`:** Array of controllers to be instantiated within the module.
- **`exports`:** Array of providers to export to other modules.
- **`imports`:** List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

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

### NestJS Controllers

- Responsible for handling incoming **requests** and returning **responses** to the client.
- Bound to a specific **path** (for exampel `/tasks` for the task resource).
- Contain **handlers**, which handle **endpoints** and **request methods** (`GET`, `POST`, etc.).
- Can take advantage of **dependency injection** to consume providers within the same module.

Controllers are defined by decorating a class with the `@Controller` decorator. The decorator accepts a string, which is the **path** to be handled by the controller.

```ts
@Controller('/tasks')
export class TaskController {}
```

#### Handlers

Handlers are simply methods within the controller class, decorated with decorators such as `@Get`, `@Post`, etc.

```ts
@Controller('/tasks')
export class TaskController {
  @Get()
  all() {
    // Do stuff.
  }

  @Post()
  store() {
    // Do stuff.
  }
}
```

#### HTTP Request Flow

1. The request is routed to a controller, and a handler is called with arguments.
  - NestJS will parse the relevant request data and it will be available in the handler.
2. Handler handles the request.
  - Perform operations such as communication with a service. For example, retrieving an item from the database.
3. Handler returns a response value.
  - The response can be of any type and even an exception. NestJS will wrap the returned value as an HTTP response and return it to the client.

### NestJS Providers

- Can be injected into constructors if decorated as an `@Injectable`, via **dependency injection**.
- Can be a plain value, a class, sync/async factory, etc.
- Providers must be provided to a module for them to be usable.
- Can be exported from a module, and then be available to other modules that import it.

#### Services

- Defined as providers. **Not all providers are services**.
- Common concept within software development and are not exclusive NestJS, JavaScript, or backend development
- Singleton when wrapped with `@Injectable` and provided to a module. That means, the same instance will be shared across the application, acting as a single source of truth.
- The main source of business logic. For example, a service will be called from a controller to validate data, create an item in the database, and return a response.

```ts
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { LoggerService } from '../shared/logger.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    LoggerService,
  ],
})
export class TasksModule {}
```

#### Dependency Injection in NestJS

Any component within the NestJS ecosystem can inhect a provider that is decorated with `@Injectable`.

We define the dependencies in the constructor of the class. NestJS will take care of the injection for us, and it will then be available as a class property.

```ts
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {

    @Get()
    async all() {
      return await this.tasksService.all();
    }
  }
}
```

## Data Transfer Object (DTO)

A DTO is an object that carries data between processes. It is used to encapsulate data and send it from one subsystem of an application to another. In NestJS, it is meant to be an object that defines how the data will be sent over the network.

- Common concept in software development that is not specific to NestJS.
- Result in more bulletproof code, as it can be used as a TypeScript type.
- Do not have any behavior except for storage, retrieval, serialization, and deserialization of its own data.
- Result in increased performance (altough negligible in small applications).
- Can be used for data validation.
- It is **not** a model definition. It defines the shape of data for a specific case, for example - creating a task.
- Can be defined using an `interface` or a `class`.
- They are not mandatory, you can develop applications without DTOs, however, the value they add makes it worthwhile to use them when applicable.
- Applying the DTO pattern as soon as possible will make it easy for you to maintain and refactor your code.

### Classes vs. Interfaces

- The recommended approach is to use **classes**, also clearly documented in the NestJS documentation.
- The reason is that interfaces are part of the TypeScript specification and therefore are not preserved post-compilation.
- Classes allow us to do more, and since they are part of JavaScript, they will be preserved post-compilation.
- NestJS cannot refer to interfaces in run-time, but can refer to classes.
