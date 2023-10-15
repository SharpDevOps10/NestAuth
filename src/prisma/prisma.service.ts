import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor () {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:nestjsisthebest@localhost:5432/nestjs?schema=public',
        },
      },
    });
  }

  async onModuleDestroy () {
    await this.$connect();
  }

  async onModuleInit () {
    await this.$disconnect();
  }
}
