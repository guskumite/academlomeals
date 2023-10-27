import Order from './order.model.js';
import Meal from '../meals/meal.model.js';
import Restaurant from '../restaurants/restaurant.model.js';

export class OrderService {
  async findAllOrders(id) {
    return await Order.findAll({
      where: {
        status: 'active',
        userId: id,
      },
      include: [
        {
          model: Meal,
          as: 'OrderToMeal',
          include: [
            {
              model: Restaurant,
              as: 'MealToRestaurant',
            },
          ],
        },
      ],
    });
  }

  async findMyOrders(id) {
    return await Order.findAll({
      where: {
        status: 'active',
        userId: id,
      },
      include: [
        {
          model: Meal,
          as: 'OrderToMeal',
          include: [
            {
              model: Restaurant,
              as: 'MealToRestaurant',
            },
          ],
        },
      ],
    });
  }

  async createOrder(data) {
    return await Order.create(data);
  }

  async updateOrder(data, id) {
    return await Order.update(data, {
      where: {
        id,
        status: 'active',
      },
    });
  }

  async findOneOrderById(id) {
    return await Order.findOne({
      where: {
        status: 'active',
        id,
      },
      include: [
        {
          model: Meal,
          as: 'OrderToMeal',
          include: [
            {
              model: Restaurant,
              as: 'MealToRestaurant',
            },
          ],
        },
      ],
    });
  }
}
