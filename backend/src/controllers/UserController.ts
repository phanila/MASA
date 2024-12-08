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

            user.equipment = [...user.equipment, ...equipment];
            res.json({ equipment: user.equipment });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    static getEquipment= async (req: Request, res: Response) => {
        const { userId } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const user = await userRepository.findOne({where: {id:userId}});

            res.json({ equipment: user.equipment });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}


