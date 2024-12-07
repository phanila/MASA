
import {Request, Response} from "express";

import {AppDataSource} from '../index';
import { Place } from '../entity/Place';



export class PlaceController {



    static create = async (req: Request, res: Response) => {
        const { name, latitude, longitude } = req.body;
        const placeRepository = AppDataSource.getRepository(Place);

        try {
            const existingPlace = await placeRepository.findOne({ where: { name } });
            if (existingPlace) return res.status(400).json({ message: 'Place already exists' });

           // const place = new Place();
            const place = placeRepository.create({name, latitude, longitude});

            await placeRepository.save(place);
            res.status(201).json({ message: 'Place created' });

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };


}