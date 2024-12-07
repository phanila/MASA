import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import {AppDataSource} from '../index';
import {User} from '../entity/User';
import {generateToken} from '../utils/jwt';

export class AuthController {
    static register = async (req: Request, res: Response) => {
        const { email, password } = req.body;
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

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const user = await userRepository.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: 'User not found' });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

            const token = generateToken(user.id);
            user.token = token;
            await userRepository.save(user);

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Change method so that it checks old password and allows changing password only if old password is correct and also you have to write the new password twice
    static changePassword = async (req: Request, res: Response) => {
        const { oldPassword, newPassword, newPasswordRepeat, userId } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        console.log(req.body);
        try {
            const user = await userRepository.findOne({ where: { id: userId } });
            if (!user) return res.status(400).json({ message: 'User not found' });

            const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isOldPasswordValid) return res.status(400).json({ message: 'Invalid old password' });

            if (newPassword !== newPasswordRepeat) return res.status(400).json({ message: 'Passwords do not match' });

            user.password = await bcrypt.hash(newPassword, 10);
            await userRepository.save(user);

            res.json({ message: 'Password changed' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}
