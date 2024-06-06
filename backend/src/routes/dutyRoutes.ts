import express from 'express';
import { getDuties, createDuty, updateDuty, deleteDuty } from '../controllers/dutyController';

const router = express.Router();

router.get('/', getDuties);
router.post('/', createDuty);
router.put('/:id', updateDuty);
router.delete('/:id', deleteDuty);

export default router;
