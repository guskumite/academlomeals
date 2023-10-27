import { catchAsync } from '../errors/index.js';
import { validateReview } from '../reviews/review.schema.js';
import { ReviewService } from '../reviews/review.service.js';
import {
  validateRestaurant,
  validateUpdateRestaurant,
} from './restaurant.schema.js';
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
export const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await restaurantService.findOneRestaurant(id);
  return res.status(200).json(restaurant);
});
export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, address } = req.body;

  // validate the name and address for errors

  const { hasError, errorMessages, restaurantData } = validateUpdateRestaurant({
    name,
    address,
  });

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  // find the restaurant record in the db to perform the update

  const foundRestaurant = await restaurantService.findOneRestaurantById(id);

  if (!foundRestaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found!`, 404));
  }

  const nametoUpdate = name || foundRestaurant.dataValues.name;
  const addresstoUpdate = address || foundRestaurant.dataValues.address;

  // update to the db

  const updatedRestaurant = await restaurantService.updateRestaurant(
    { name: nametoUpdate, address: addresstoUpdate },
    id
  );

  return res.status(200).json({ nametoUpdate, addresstoUpdate });
});
export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // find the restaurant record in the db to perform the update

  const foundRestaurant = await restaurantService.findOneRestaurantById(id);

  if (!foundRestaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found!`, 404));
  }

  // update to the db

  const deletedRestaurant = await restaurantService.updateRestaurant(
    { status: 'disabled' },
    id
  );

  return res.status(200).json('Successfully deleted');
});
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
export const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;
  const { id } = req.params;

  const { hasError, errorMessages, reviewData } = validateReview(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  const foundReview = await ReviewService.findOneReview(id);

  if (!foundReview) {
    return next(new AppError(`Review with id: ${id} not found!`, 404));
  }

  const reviewUpdated = await ReviewService.updateReview(
    {
      comment,
      rating,
    },
    foundReview.dataValues.id
  );

  return res.status(200).json({ comment, rating });
});
export const deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const foundReview = await ReviewService.findOneReviewById(id);

  if (!foundReview) {
    return next(new AppError(`Review with id: ${id} not found!`, 404));
  }

  const reviewDeleted = await ReviewService.updateReview(
    { status: 'deleted' },
    id
  );

  return res.status(200).json('Succesfully deleted');
});
