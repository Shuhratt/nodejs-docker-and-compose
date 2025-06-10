import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export const getTypeOrmConfig = <R extends TypeOrmModuleAsyncOptions | DataSourceOptions>(
  configService: ConfigService
): R => {
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities: [join(__dirname, '..', '**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'database', 'migrations', '*{.js,.ts}')], //migrations: [join(__dirname, '..', 'database', 'migrations', '*{.js,.ts}')], // Путь к миграциям migrations
    synchronize: false, // Отключите synchronize при использовании миграций
    logging: configService.get<string>('MODE') === 'development' // Логирование
  } as R;
};
