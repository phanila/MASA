import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length} from 'class-validator';
import { Meeting } from './Meeting';

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(6, 20)
    name: string;

    @Column({type: "float"})
    latitude: number;

    @Column({type: "float"})
    longitude: number;

    @Column()
    rating: number;

    @OneToMany(()=>Meeting, (meeting)=>meeting.place)
    meetings: Meeting[];

    @Column()
    howManyRatings: number;
}