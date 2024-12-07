import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Length } from 'class-validator';
import { Equipment } from './Equipment';
import { Place } from './Place';

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=>Place, (place)=>place.meetings)
    place: Place;

    @Column()
    countInterested: number;

    @ManyToMany(()=>Equipment)
    equipment: Equipment[];

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    ratingOfWeather: number;
}