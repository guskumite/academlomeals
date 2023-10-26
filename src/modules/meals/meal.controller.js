import { AppError, catchAsync } from '../errors/index.js';
import { validateMeal, validateUpdateMeal } from './meal.schema.js';
import { RestaurantService } from '../restaurants/restaurant.service.js';
import { MealService } from './meal.service.js';

const mealService = new MealService();
const restaurantService = new RestaurantService();

export const findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await mealService.findAllMeals();
  return res.status(200).json(meals);
});

export const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  // This is the restaurant id that comes as a parameter

  const { id } = req.params;

  const { hasError, errorMessages, mealData } = validateMeal(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  // find the restaurant that owns the meal to be created

  const restaurant = await restaurantService.findOneRestaurantById(id);

  if (!restaurant) {
    return next(new AppError(`restaurant with id: ${id} not found!`));
  }

  mealData.restaurantId = restaurant.dataValues.id;

  const meal = await mealService.createMeal(mealData);

  return res.status(201).json(meal);
});

export const findUniqueMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await mealService.findOneMeal(id);

  if (!meal) {
    return next(new AppError(`meal with id: ${id} not found!`));
  }

  return res.status(200).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, price } = req.body;

  // validate the name and price for errors

  const { hasError, errorMessages, mealData } = validateUpdateMeal({
    name,
    price,
  });

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  // find the meal record in the db to perform the update

  const foundMeal = await mealService.findOneMeal(id);

  if (!foundMeal) {
    return next(new AppError(`Meal with id: ${id} not found!`));
  }

  const nametoUpdate = name || foundMeal.dataValues.name;
  const pricetoUpdate = price || foundMeal.dataValues.price;

  // update to the db

  const updatedMeal = await mealService.updateMeal(
    { name: nametoUpdate, price: pricetoUpdate },
    id
  );

  return res.status(200).json({ nametoUpdate, pricetoUpdate });
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // find the meal record in the db to perform the update

  const foundMeal = await mealService.findOneMeal(id);

  if (!foundMeal) {
    return next(new AppError(`Meal with id: ${id} not found!`));
  }

  // update to the db

  const deletedMeal = await mealService.updateMeal(
    { status: 'unavailable' },
    id
  );

  return res.status(200).json('Succesfully deleted');
});
