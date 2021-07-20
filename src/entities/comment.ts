import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('comment')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:  number;
    @Column({
        length:500
    })
    @Column()
    comment: string;
    @CreateDateColumn()
    created_at: Date;
    // @Column()
    // public_ip_address: string;
    @Column({
        type:"numeric"
    })
    film_id: string;

}
