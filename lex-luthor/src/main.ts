// Did you even bother to open this file? C'mon man, So unprofessional!
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(6969); // Our port standards
}
bootstrap();
