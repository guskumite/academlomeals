import express from 'express';
import {
  createOrder,
  findAllOrders,
  findMyOrders,
  findOneOrderById,
  updateOrder,
  deleteOrder,
} from './order.controller.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/auth.middleware.js';

export const router = express.Router();

router.route('/').get(findAllOrders).post(protect, createOrder);
router.route('/me').get(protect, findMyOrders);

router
  .route('/:id')
  .get(findOneOrderById)
  .patch(protect, protectAccountOwner, updateOrder)
  .delete(protect, protectAccountOwner, deleteOrder);
