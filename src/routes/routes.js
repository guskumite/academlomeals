import express from 'express';
import { router as userRouter } from '../modules/users/users.routes.js';

export const router = express.Router();

router.use('/users', userRouter);

export default router;
