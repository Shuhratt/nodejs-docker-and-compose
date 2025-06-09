import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Регистрация глобального фильтра
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Глобальная регистрация ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Преобразование типов
      whitelist: true, // Игнорирование лишних полей
      forbidNonWhitelisted: true // Ошибка при наличии лишних полей
    })
  );

  // Получаем ConfigService из контейнера зависимостей
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  swaggerConfig(app);
  await app.listen(port);
}
bootstrap();
