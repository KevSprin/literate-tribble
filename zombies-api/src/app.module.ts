import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { ZombiesModule } from './zombies/zombies.module';


@Module({
  imports: [
    ZombiesModule,
    ItemsModule,
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
      entities: ['**/*.entity.js'],
      synchronize: true
    }),
  ]
})
export class AppModule {}
