import Meal from './meal.model.js';

export class MealService {
  async findAllMeals() {
    return await Meal.findAll({
      where: {
        status: 'active',
      },
    });
  }

  async createMeal(data) {
    return await Meal.create(data);
  }

  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        status: 'active',
        id,
      },
    });
  }
}
