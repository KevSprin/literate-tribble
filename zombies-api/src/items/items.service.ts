import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Zombie } from "src/zombies/zombie.entity";
import { Repository } from 'typeorm';
import { CreateItemDto } from "./dtos/create-item.dto";
import { Item } from "./item.entity";

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Zombie) private zombieRepo: Repository<Zombie>,
  @InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async getItems() : Promise<Item[]>{
    return await this.itemRepo.find();
  }

  async addItem(item: CreateItemDto) {
    const { zombieId, itemName, price } = item;
    const zombie = await this.zombieRepo.findOneOrFail(zombieId);
    const newItem = this.itemRepo.create({ itemName, price, zombie });
    return this.itemRepo.save(newItem);
  }
}