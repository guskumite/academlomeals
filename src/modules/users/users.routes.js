import express from 'express';
import { deleteUser, updateUser, login, register } from './users.controller.js';
import { protect, restrictTo } from './auth.middleware.js';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);

router.use(protect);
router
  .route('/:id')
  .patch(restrictTo('normal', 'admin', 'employee', 'developer'), updateUser)
  .delete(restrictTo('normal', 'admin', 'employee', 'developer'), deleteUser);
