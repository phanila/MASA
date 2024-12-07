import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

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
}