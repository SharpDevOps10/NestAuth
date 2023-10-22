import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
