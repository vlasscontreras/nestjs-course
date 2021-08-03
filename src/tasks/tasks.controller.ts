import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.class';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  all(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  find(@Param('id') id: string): Task {
    return this.tasksService.getTask(id);
  }

  @Post()
  store(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
