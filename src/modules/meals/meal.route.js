import express from 'express';
import {
  createMeal,
  findAllMeals,
  findUniqueMeal,
  updateMeal,
  deleteMeal,
} from './meal.controller.js';
import { validExistRestaurant } from './meal.middleware.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/auth.middleware.js';

export const router = express.Router();

router.route('/').get(findAllMeals);

router
  .route('/:id')
  .post(protect, restrictTo('admin'), validExistRestaurant, createMeal)
  .get(findUniqueMeal)
  .patch(protect, restrictTo('admin'), updateMeal)
  .delete(protect, restrictTo('admin'), deleteMeal);
