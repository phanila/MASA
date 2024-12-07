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
        const { userId, name,  } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = userRepository.create({ email, password: hashedPassword });
            await userRepository.save(user);

            res.status(201).json({ message: 'User created' });
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


