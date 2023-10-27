import Meal from '../meals/meal.model.js';
import Restaurant from '../restaurants/restaurant.model.js';

export class MealService {
  async findAllMeals() {
    return await Meal.findAll({
      where: {
        status: 'active',
      },
      include: [
        {
          model: Restaurant,
          as: 'MealToRestaurant',
        },
      ],
    });
  }

  async createMeal(data) {
    return await Meal.create(data);
  }

  async updateMeal(data, id) {
    return await Meal.update(data, {
      where: {
        id,
        status: 'active',
      },
    });
  }

  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        status: 'active',
        id,
      },
      include: [
        {
          model: Restaurant,
          as: 'MealToRestaurant',
        },
      ],
    });
  }
}
