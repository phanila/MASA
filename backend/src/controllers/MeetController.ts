import {Request, Response} from 'express';
import { In } from "typeorm"
import bcrypt from 'bcryptjs';
import {AppDataSource} from '../index';
import {User} from '../entity/User';
import {generateToken} from '../utils/jwt';
import { Meeting } from '../entity/Meeting';
import { Place } from '../entity/Place';
import { Equipment } from '../entity/Equipment';

export class MeetController {
    static create = async (req: Request, res: Response) => {
        const { userId, name, desc, date, time, equipment} = req.body;
        const meetRepository = AppDataSource.getRepository(Meeting);

        try {
            const meeting = meetRepository.create({ name, desc, date, time, equipment });
            await meetRepository.save(meeting);

            res.status(201).json({ message: 'Meeting created' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    static getMeetings= async (req: Request, res: Response) => {
        const meetingRepository = AppDataSource.getRepository(Meeting);

        try {
            const Meetings = await meetingRepository.find();

            res.json({ Meetings });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}


