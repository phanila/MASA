import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(3, 100)
    name: string;

    @ManyToOne(()=>User, (user)=>user.equipment)
    user: User;

}