import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { TransformInterceptor } from '@/transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
  logger.log('App is listening on port 3000');
}
bootstrap();
