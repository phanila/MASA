import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length} from 'class-validator';

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idPlace: number; // place is wanted

    @Column()
    countInterested: number;

    @Column()
    idEquipment: number[]; // array of string is wanted

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    ratingOfWeather: number;
}