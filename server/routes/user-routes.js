import express from 'express';
const router = express.Router();
import { login, register, me } from '../controllers/user-controller.js'

router.post('/register', register);
router.post('/login', login);
router.get('/me', me);

export default router;
