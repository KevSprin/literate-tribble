import { Zombie } from "src/zombies/zombie.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "item_name"})
  itemName: string;

  @Column()
  price: number;

  @ManyToOne(() => Zombie, zombie => zombie.items)
  zombie: Zombie;
}