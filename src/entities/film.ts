import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Comment } from "./comment";

@Entity('film')
export class Film extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:  number;
    @Column()
    title:string;
    @Column()
    episode_id:number;
    @Column()
    opening_crawl: string;
    @Column()
    director: string;
    @Column()
    producer: string;
    @Column({
        default: 0
    })
      comment_count: number;
    @Column({
        type:"date"
    })
    release_date:string;
    @Column({ type: "simple-array", default: [] })
    characters: string[];
    @Column({ type: "simple-array", default: [] })
    planets: string[];
    @Column({ type: "simple-array", default: [] })
    starships: string[];
    @Column({ type: "simple-array", default: [] })
    vehicles: string[];
    @Column({ type: "simple-array", default: [] })
    species: string[];
    @CreateDateColumn({
        type: "date"
    })
    created: string;
    @UpdateDateColumn({
        type: "date"
    })
    edited: string;
    @Column()
    url: string;

    @OneToMany(
        () => Comment,
        comment => comment.film
    )
    comments: Comment[];
}
