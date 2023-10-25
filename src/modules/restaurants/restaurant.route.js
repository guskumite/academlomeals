import express from 'express';
import {
  createRestaurant,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReviewToRestaurant,
  updateReview,
  deleteReview,
} from './restaurant.controller.js';
import { validExistRestaurant } from './restaurant.middleware.js';
import { validExistReview } from '../reviews/review.middleware.js';
import {
  protect,
  protectAccountOwner,
  restrictTo,
} from '../users/auth.middleware.js';

export const router = express.Router();

router
  .route('/')
  .get(findAllRestaurants)
  .post(protect, restrictTo('admin'), createRestaurant);

router
  .route('/:id')
  .get(findOneRestaurant)
  .patch(protect, restrictTo('admin'), updateRestaurant)
  .delete(protect, restrictTo('admin'), deleteRestaurant);

router.post('/reviews/:id', validExistRestaurant, createReviewToRestaurant);
router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validExistRestaurant,
    validExistReview,
    protect,
    protectAccountOwner,
    updateReview
  )
  .delete(
    validExistRestaurant,
    validExistReview,
    protect,
    protectAccountOwner,
    deleteReview
  );
