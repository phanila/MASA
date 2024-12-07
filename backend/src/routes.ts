import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middleware/authMiddleware';
import {PlaceController} from "./controllers/PlaceController";
import { MeetController } from './controllers/MeetController';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/change-password', authMiddleware, AuthController.changePassword);
router.get('/protected', authMiddleware, (req, res) => res.json({ message: 'This is a protected route' }));
router.get('/meetings', authMiddleware, MeetController.getMeetings);

router.post('/place-create', PlaceController.create);
router.patch('/place-rate', PlaceController.ratePlace);

export default router;
