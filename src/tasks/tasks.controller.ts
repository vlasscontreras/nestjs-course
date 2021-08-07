import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@/auth/get-user.decorator';
import { User } from '@/auth/user.entity';
import { CreateTaskDto } from '@/tasks/dto/create-task.dto.class';
import { GetTasksFilterDto } from '@/tasks/dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '@/tasks/dto/update-task-status.dto';
import { Task } from '@/tasks/task.entity';
import { TasksService } from '@/tasks/tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Get()
  all(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${
        user.username
      } is retrieving all tasks with filters ${JSON.stringify(filterDto)}`,
    );

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  find(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTask(id, user);
  }

  @Post()
  store(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User ${user.username} is creating a tasks with ${JSON.stringify(
        createTaskDto,
      )}`,
    );

    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete(':id')
  destroy(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
