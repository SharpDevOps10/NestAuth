import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

class UserService {
}

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

  describe('createUser()', () => {
  });
});