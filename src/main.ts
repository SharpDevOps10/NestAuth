import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AccessTokenGuard } from "./common/guards";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AccessTokenGuard());
  await app.listen(3000);
}
bootstrap();
