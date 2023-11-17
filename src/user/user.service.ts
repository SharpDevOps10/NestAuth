import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  createUser (email: string) {
    return this.prisma.user
      .create({
        data: {
          email,
          hash: '',
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('User already exists');
          }
        }
        throw error;
      });
  }
}