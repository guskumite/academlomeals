import { catchAsync } from '../errors/index.js';
import { RestaurantService } from './restaurant.service.js';

const restaurantService = new RestaurantService();

export const validExistRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const restaurant = await restaurantService.findOneRestaurant(
    id,
    restaurantId
  );

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  req.restaurant = restaurant;

  next();
});
