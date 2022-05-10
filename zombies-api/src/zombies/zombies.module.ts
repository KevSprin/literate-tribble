import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';
import { Zombie } from './zombie.entity';
import { ZombiesController } from './zombies.controller';
import { ZombiesService } from './zombies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Zombie, Item])],
  controllers: [ZombiesController],
  providers: [ZombiesService]
})
export class ZombiesModule {}
