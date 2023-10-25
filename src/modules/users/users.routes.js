import express from 'express';
import { deleteUser, updateUser, login, register } from './users.controller.js';
import { protect, protectAccountOwner, restrictTo } from './auth.middleware.js';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.use(protect);
router
  .route('/:id')
  .patch(protect, protectAccountOwner, updateUser)
  .delete(protect, protectAccountOwner, deleteUser);
