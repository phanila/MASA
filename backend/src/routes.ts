import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middleware/authMiddleware';
import { PlaceController} from "./controllers/PlaceController";
import { MeetController } from './controllers/MeetController';
import { UserController } from './controllers/UserController';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/change-password', authMiddleware, AuthController.changePassword);

router.get('/user/equipment', authMiddleware, UserController.getEquipment);
router.post('/user/equipment/add', authMiddleware, UserController.addEquipment);
router.get('/protected', authMiddleware, (req, res) => res.json({ message: 'This is a protected route' }));
router.get('/meetings', authMiddleware, MeetController.getMeetings);
router.post('/meeting-create', authMiddleware, MeetController.create);
router.post('/meeting-join', authMiddleware, MeetController.join);

router.get('/places', authMiddleware, PlaceController.getPlaces);
router.post('/place-create', authMiddleware, PlaceController.create);
router.patch('/place-rate', authMiddleware, PlaceController.ratePlace);

export default router;
