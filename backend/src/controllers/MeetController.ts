import {Request, Response} from 'express';
import {AppDataSource} from '../index';
import { Meeting } from '../entity/Meeting';
import { Place } from '../entity/Place';
import { WeatherController } from './WeatherController';

export class MeetController {
    static create = async (req: Request, res: Response) => {
        const {userId} = req.body;
        const { name, desc, lat, lon, date, equipment} = req.body.meeting;
        const placeRepository = AppDataSource.getRepository(Place);
        const meetRepository = AppDataSource.getRepository(Meeting);

        try {
            let place = await placeRepository.findOne({where: {latitude: lat, longitude: lon}});
            if(!place){
                place = placeRepository.create({ name:"Not known", latitude: lat, longitude:lon, rating: 0, howManyRatings: 0});
                await placeRepository.save(place);
            }
            const meeting = meetRepository.create({ name, desc, countInterested: 1, place:
            { name:"Not known", latitude: lat, longitude:lon, rating: 0, howManyRatings: 0}
            , equipment, date });
            await meetRepository.save(meeting);

            res.status(201).json({ message: 'Meeting created' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    static join= async (req: Request, res: Response) => {
        const { meetingId, equipment } = req.body;
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
            const Meetings = await meetingRepository.find({
                relations: ['place']
            });

            let meetings = Meetings.map(async (meeting) => {
                return {
                    id: meeting.id,
                    name: meeting.name,
                    desc: meeting.desc,
                    countInterested: meeting.countInterested,
                    place: {
                        id: meeting.place.id,
                        name: meeting.place.name,
                        latitude: meeting.place.latitude,
                        longitude: meeting.place.longitude,
                        rating: (await WeatherController.getWeather(meeting.place.latitude, meeting.place.longitude)).magnitude
                    },
                    equipment: meeting.equipment,
                    date: meeting.date
                }
            })

            res.json({ meetings: meetings });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}


