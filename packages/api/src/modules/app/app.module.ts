import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from '../../config/database';
import app from '../../config/app';
import { LinkModule } from '../link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, app],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: 5432,
        username: config.get<string>('database.user'),
        password: config.get<string>('database.pass'),
        database: config.get<string>('database.name'),
        entities: ["**/*.entity{.ts,.js}"],
        migrations: ['../../migrations/**/*{.ts,.js}'],
        migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
