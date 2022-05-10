import { Item } from "src/items/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zombie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "zombie_name" })
  zombieName: string;

  @Column({ name: "creation_date", type: "timestamptz" })
  creationDate: Date;

  @OneToMany(() => Item, item => item.zombie)
  items: Item[];
}