import Restaurant from './restaurant.model.js';
import Review from '../reviews/review.model.js';

export class RestaurantService {
  async findAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: 'active',
      },
      include: [
        {
          model: Review,
          as: 'RestaurantToReviews',
        },
      ],
    });
  }
  async createRestaurant(data) {
    return await Restaurant.create(data);
  }

  async updateRestaurant(data, id) {
    return await Restaurant.update(data, {
      where: {
        id,
        status: 'active',
      },
    });
  }

  async findOneRestaurantById(id) {
    return await Restaurant.findOne({
      where: {
        id,
        status: 'active',
      },
    });
  }

  async findOneRestaurant(id, restaurantId) {
    return await Restaurant.findOne({
      where: {
        status: 'active',
        id: restaurantId || id,
      },
      include: [
        {
          model: Review,
          as: 'RestaurantToReviews',
        },
      ],
    });
  }
}
