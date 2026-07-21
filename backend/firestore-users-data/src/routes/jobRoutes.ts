import { Router } from 'express';
import { pollJobResults, updateJobResults } from '../controllers/jobController';

const router = Router();

/*@ts-ignore*/
router.get('/:jobId', pollJobResults);
/*@ts-ignore*/
router.post('/:jobId', updateJobResults);

export default router;
