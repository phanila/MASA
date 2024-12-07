
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
            place.rating = -1;
            place.howManyRatings = 0;
            await placeRepository.save(place);
            res.status(201).json({ message: 'Place created' });

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    static ratePlace = async (req: Request, res: Response) => {
        const { name, rating } = req.body;
        const placeRepository = AppDataSource.getRepository(Place);

        try {
            if (typeof rating !== 'number' || rating < 1 || rating > 5) {
                return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
            }

            // Find the place by its ID
            const place = await placeRepository.findOne({ where: { name: name } });
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
            if (place.howManyRatings === 0) {
                // If no ratings exist, just set the rating to the new value
                place.rating = rating;
            } else {
                // count average
                const totalRatings = place.rating * place.howManyRatings;
                const newTotalRatings = totalRatings + rating;
                place.howManyRatings += 1;
                place.rating = newTotalRatings / place.howManyRatings;
            }

            await placeRepository.save(place);

            res.status(200).json({ message: 'Place rated successfully', place });

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };


}