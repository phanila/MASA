import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Equipment } from './Equipment';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(6, 20)
    password: string;

    @Column({ nullable: true })
    token: string | null;

    @OneToMany(()=>Equipment, (equipment)=>equipment.user)
    equipment: Equipment[];
}