import { catchAsync } from '../errors/index.js';
import { ReviewService } from '../reviews/review.service.js';
import { validateRestaurant } from './restaurant.schema.js';
import { RestaurantService } from './restaurant.service.js';

const restaurantService = new RestaurantService();

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const { hasError, errorMessages, restaurantData } = validateRestaurant(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  const restaurant = await restaurantService.createRestaurant(restaurantData);

  return res.status(201).json({
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});
export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await restaurantService.findAllRestaurants();
  return res.status(200).json(restaurants);
});
export const findOneRestaurant = catchAsync(async (req, res, next) => {});
export const updateRestaurant = catchAsync(async (req, res, next) => {});
export const deleteRestaurant = catchAsync(async (req, res, next) => {});
export const createReviewToRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  // This is the restaurant id but comes as id when the route is typed
  const { id } = req.params;

  const { sessionUser } = req;

  const review = await ReviewService.create({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });

  return res.status(201).json(review);
});
export const updateReview = catchAsync(async (req, res, next) => {});
export const deleteReview = catchAsync(async (req, res, next) => {});
