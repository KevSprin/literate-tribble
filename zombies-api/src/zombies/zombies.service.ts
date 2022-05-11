import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';
import { Repository } from 'typeorm';
import { AddItemToZombieDto } from './dtos/add-item-to-zombie.dto';
import { CreateZombieDto } from './dtos/create-zombie.dto';
import { EditZombieDto } from './dtos/edit-zombie.dto';
import { Zombie } from './zombie.entity';

@Injectable()
export class ZombiesService {
  constructor(@InjectRepository(Zombie) private zombieRepo: Repository<Zombie>,
  @InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async getAll() : Promise<Zombie[]> {
    return await this.zombieRepo.find();
  }

  async getById(id: number) {
    return await this.zombieRepo.findOneOrFail(id);
  }

  async getItemsById(id: number):Promise<Item[]> {
    let result;
    try {
      const zombie = await this.zombieRepo.findOneOrFail(id);
      const items = await this.itemRepo.find({ where: { zombie }}) ;
      result = items;
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  async getZombieItemsTotalValue(id: number) {
    let result;
    try {
      const items = await this.getItemsById(id);
      const sum = items.reduce((prev, curr) => prev + curr.price, 0);
      result = {
        totalPLN: sum,
        totalEU: sum,
        totalUSD: sum
      }
    } catch (err) {
      throw Error(err);
    }
    return result;
  }

  async add(zombie : CreateZombieDto) {
    zombie.creationDate = zombie.creationDate ?? new Date(Date.now());
    const newZombie = this.zombieRepo.create(zombie);
    return await this.zombieRepo.save(newZombie);
  }

  async addItemToZombie(zombieItem: AddItemToZombieDto) {
    const { zombieId, itemId } = zombieItem;
    try{
      const zombie = await this.zombieRepo.findOneOrFail(zombieId);
      if (zombie.items.length >= 5) throw Error("Zombie already has 5 items!");
      const item = await this.itemRepo.findOneOrFail(itemId);
      this.zombieRepo.update(zombieId, item);
    } catch (err) {
      throw Error(err);
    }
  }

  async remove(id: number) {
    let zombie; 
    try {
      zombie = await this.zombieRepo.findOneOrFail(id);
      this.zombieRepo.remove(zombie);
    } catch(err) {
      throw Error(err);
    }
  }

  async edit(id: number, editZombie: EditZombieDto) {
    let zombie;
    try {
      zombie = await this.zombieRepo.findOneOrFail(id);
      zombie.zombieName = editZombie.zombieName;
      this.zombieRepo.save(zombie);
    } catch(err) {
      throw Error(err);
    } 
  }
}
