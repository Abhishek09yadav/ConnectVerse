
import express from 'express';
import { updateStreak, getStreak } from '../controllers/streakController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/update', auth, updateStreak);
router.get('/', auth, getStreak);

export default router;
