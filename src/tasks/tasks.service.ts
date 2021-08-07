import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/auth/user.entity';
import { CreateTaskDto } from '@/tasks/dto/create-task.dto.class';
import { GetTasksFilterDto } from '@/tasks/dto/get-tasks-filter.dto';
import { Task } from '@/tasks/task.entity';
import { TaskStatus } from '@/tasks/task.enum';
import { TasksRepository } from '@/tasks/tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTask(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    return this.tasksRepository.createTask(
      {
        title,
        description,
      },
      user,
    );
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTask(id, user);

    task.status = status;
    return this.tasksRepository.save(task);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
