import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';


describe('UserService Int', () => {
  let prisma: PrismaService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
    await prisma.cleanDatabase();
  });

  describe('createUser()', async () => {
    it('should create user', async () => {
      const user = await userService.createUser('john@gmail.com',);
      expect(user.email).toBe('john@gmail.com');
    });
    it('should throw on duplicate email', async () => {
      try {
        await userService.createUser('john@gmail.com');
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });
  });
});