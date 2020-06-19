import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.get<number>('app.port', 3000));
}
bootstrap();
