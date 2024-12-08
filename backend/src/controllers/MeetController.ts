import {Request, Response} from 'express';
import {AppDataSource} from '../index';
import { Meeting } from '../entity/Meeting';
import { Place } from '../entity/Place';

export class MeetController {
    static create = async (req: Request, res: Response) => {
        const { userId, name, desc, lat, long, date, time, equipment} = req.body;
        const placeRepository = AppDataSource.getRepository(Place);
        const meetRepository = AppDataSource.getRepository(Meeting);

        try {
            const place = await placeRepository.findOne({where: {latitude: lat, longitude: long}});
            if (!place) { const place = placeRepository.create({ name:"Not known", latitude: lat, longitude:long });
                await placeRepository.save(place);}
            const meeting = meetRepository.create({ name, desc, countInterested: 1, place, equipment, date, time });
            await meetRepository.save(meeting);

            res.status(201).json({ message: 'Meeting created' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    static join= async (req: Request, res: Response) => {
        const { userId, meetingId, equipment } = req.body;
        const meetRepository = AppDataSource.getRepository(Meeting);

        try {
            const meeting = await meetRepository.findOne({where: {id:meetingId}});
            meeting.countInterested++;
            meeting.equipment = [...meeting.equipment, ...equipment];

            await meetRepository.save(meeting);

            res.status(201).json({ message: 'Meeting joined' });
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


