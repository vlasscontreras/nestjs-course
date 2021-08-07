import { Test } from '@nestjs/testing';
import { TasksRepository } from '@/tasks/tasks.repository';
import { TasksService } from '@/tasks/tasks.service';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: '12345678-1234-5678-1234-567812345678',
  username: 'johndoe',
  password: 'password',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns all the tasks', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');

      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toBe('someValue');
    });
  });

  describe('getTask', () => {
    it('calls TasksRepository.findOne and returns the task', async () => {
      const mockTask = {
        id: '12345678-1234-5678-1234-567812345678',
        title: 'someTitle',
        description: 'someDescription',
        status: 'someStatus',
      };

      await tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTask(mockTask.id, mockUser);
      expect(result).toBe(mockTask);
    });

    it('calls TasksRepository.findOne and handles error', async () => {
      await tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTask('1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
