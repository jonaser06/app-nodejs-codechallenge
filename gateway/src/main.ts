import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './common';
import { logger as instance } from './common/logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { logger: WinstonModule.createLogger({instance}) });
  app.setGlobalPrefix('api');
  await app.listen(envs.port);
}
bootstrap();
