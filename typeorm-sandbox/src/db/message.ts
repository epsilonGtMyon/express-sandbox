import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({
    name :"created_at"
  })
  createdAt!: Date;
}
