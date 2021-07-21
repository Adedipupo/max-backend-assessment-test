import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Film } from "./film";

@Entity("comment")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
      type:"varchar", 
    length: 500,
  })
  comments: string;
  @CreateDateColumn()
  created_at: Date;
  //   @Column({
  //     type: "numeric",
  //   })
  //   public_ip_address: number;

  @ManyToOne(() => Film, (film) => film.comments)
  @JoinColumn({
    name: "film_id",
  })
  film: Film;
}
