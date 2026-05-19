import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { registerValidation, loginValidation } from '../middleware/validation.middleware';

const router = express.Router();
const authController = new AuthController();

// Make sure these routes are defined
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/me', authenticateToken, authController.getMe);

export default router;
