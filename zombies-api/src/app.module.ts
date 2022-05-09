import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZombiesModule } from './zombies/zombies.module';


@Module({
  imports: [
    ZombiesModule,
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js']
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
