import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(6, 20)
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    rating: number;
}