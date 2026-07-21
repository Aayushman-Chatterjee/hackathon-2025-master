import { Router } from 'express';
import { fetchUserData, updateUserData } from '../controllers/userController';

const router = Router();

/*@ts-ignore*/
router.get('/:userId', fetchUserData);
/*@ts-ignore*/
router.post('/:userId', updateUserData);

export default router;
