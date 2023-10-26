import { AppError, catchAsync } from '../errors/index.js';
import { MealService } from '../meals/meal.service.js';
import { validateOrder } from './order.schema.js';
import { OrderService } from './order.service.js';

const mealService = new MealService();
const orderService = new OrderService();

export const findAllOrders = catchAsync(async (req, res, next) => {
  const orders = await orderService.findAllOrders();
  return res.status(200).json(orders);
});

export const findMyOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const userId = sessionUser.dataValues.id;

  const orders = await orderService.findMyOrders(userId);

  return res.status(200).json(orders);
});

export const createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;

  const meal = await mealService.findOneMeal(mealId);

  if (!meal) {
    return next(new AppError(`Meal with id: ${mealId} not found!`));
  }

  const { sessionUser } = req;

  const userId = sessionUser.id;

  const totalPrice = quantity * meal.dataValues.price;

  const status = 'active';

  const { hasError, errorMessages, orderData } = validateOrder({
    userId,
    mealId,
    quantity,
    totalPrice,
    status,
  });

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  const order = await orderService.createOrder(orderData);

  return res.status(201).json(order);
});

export const findOneOrderById = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const updateOrder = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});
