import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zombie } from 'src/zombies/zombie.entity';
import { Item } from './item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Zombie])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}