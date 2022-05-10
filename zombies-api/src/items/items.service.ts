import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Zombie } from "src/zombies/zombie.entity";
import { Repository } from 'typeorm';
import { Item } from "./item.entity";

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Zombie) private zombieRepo: Repository<Zombie>,
  @InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async addItem(itemName: string, price: number, zombieId: number) {
    const zombie = await this.zombieRepo.findOneOrFail(zombieId);
    const newItem = this.itemRepo.create({ itemName, price, zombie });
    // console.log(zombie);
    // const item = new Item();
    // item.itemName = itemName;
    // item.price = price;
    // item.zombie = zombie;
    return this.itemRepo.save(newItem);
  }
}