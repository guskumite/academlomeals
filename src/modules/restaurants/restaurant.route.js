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

export const router = express.Router();

router.route('/').get(findAllRestaurants).post(createRestaurant);

router
  .route('/:id')
  .get(findOneRestaurant)
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

router.post('/reviews/:id', validExistRestaurant, createReviewToRestaurant);
router
  .route('/reviews/:restaurantId/:id')
  .patch(validExistRestaurant, validExistReview, updateReview)
  .delete(deleteReview);
