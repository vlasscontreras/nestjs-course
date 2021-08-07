import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { User } from '@/auth/user.entity';
import { CreateTaskDto } from '@/tasks/dto/create-task.dto.class';
import { GetTasksFilterDto } from '@/tasks/dto/get-tasks-filter.dto';
import { Task } from '@/tasks/task.entity';
import { TaskStatus } from '@/tasks/task.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository', { timestamp: true });

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task').where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(task.title) LIKE LOWER(:search)', {
            search: `%${search}%`,
          });

          qb.orWhere('LOWER(task.description) LIKE LOWER(:search)', {
            search: `%${search}%`,
          });
        }),
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for the user ${
          user.username
        } with filters ${JSON.stringify(filterDto)}`,
        error.stack,
      );

      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
