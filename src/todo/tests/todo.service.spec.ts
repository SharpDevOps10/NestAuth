import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../todo.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AppModule } from '../../app.module';
import { CreateTodoDto } from '../dto';
import { TodoStatus } from '.prisma/client';

describe('TodoService', () => {
  let service: TodoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prisma = module.get(PrismaService);

    service = module.get<TodoService>(TodoService);
  });

  describe('createTodo()', () => {
    let userId: number;
    const dto: CreateTodoDto = {
      title: 'First todo',
      description: 'First todo description',
    };
    it('should create user', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'john@gmail.com',
          hash: '',
        },
      });
      userId = user.id;
    });
    it('should create todo', async () => {
      const todo = await service.createTodo(userId, dto);
      expect(todo.title).toBe(dto.title);
      expect(todo.description).toBe(dto.description);
      expect(todo.status).toBe(TodoStatus.OPEN);
    });
  });
});
