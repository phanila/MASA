import {Request, Response} from 'express';
import {AppDataSource} from '../index';
import { User } from '../entity/User';
import { Equipment } from '../entity/Equipment';

export class UserController {
    static addEquipment= async (req: Request, res: Response) => {
        const { userId, name } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const equipmentRepository = AppDataSource.getRepository(Equipment);

        try {
            const user = await userRepository.findOne({where: {id:userId}});
            const equipment = equipmentRepository.create(name);
            await  equipmentRepository.save(equipment)


            res.status(201).json({ message: 'add equipment' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    static getEquipment= async (req: Request, res: Response) => {
        const { userId } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const equipRepository = AppDataSource.getRepository(Equipment);

        try {
            const equipment = await equipRepository.find({where: {user:userId}});

            res.json({ equipment});
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}


