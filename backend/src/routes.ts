import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middleware/authMiddleware';
import { MeetController } from './controllers/MeetController';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/change-password', authMiddleware, AuthController.changePassword);
router.get('/protected', authMiddleware, (req, res) => res.json({ message: 'This is a protected route' }));
router.get('/meetings', authMiddleware, MeetController.getMeetings);

export default router;
