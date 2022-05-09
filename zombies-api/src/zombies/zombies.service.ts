import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zombie } from './zombie.entity';

@Injectable()
export class ZombiesService {
  constructor(@InjectRepository(Zombie) private repo: Repository<Zombie>) {}

  getAll() {
    return this.repo.find();
  }

  getById(id: number) {
    return this.repo.findOne(id);
  }

  add(zombieName: string, creationDate: Date) {
    const newZombie = this.repo.create({ zombieName, creationDate });
    return this.repo.save(newZombie);
  }

  async remove(id: number) {
    const zombie = await this.repo.findOne(id);
    this.repo.remove(zombie);
  }

  async edit(id: number, zombieName: string) {
    console.log('I was in the service');
    const zombie = await this.repo.findOne(id);
    zombie.zombieName = zombieName;
    this.repo.save(zombie);
  }
}
