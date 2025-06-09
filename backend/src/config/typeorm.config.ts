import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const getTypeOrmConfig = <R extends TypeOrmModuleAsyncOptions | DataSourceOptions>(
  configService: ConfigService
): R =>
  ({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities: ['dist/**/*.entity.js'], // Путь к сущностям
    migrations: ['src/database/migrations/*{.ts,.js}'], // Путь к миграциям
    synchronize: false, // Отключите synchronize при использовании миграций
    logging: configService.get<string>('MODE') === 'development' // Логирование
  }) as R;
