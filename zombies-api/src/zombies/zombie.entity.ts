import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zombie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "zombie_name"})
  zombieName: string;

  @Column({ name: "creation_date"})
  creationDate: Date;
}