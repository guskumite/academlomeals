import Restaurant from './restaurant.model.js';

export class RestaurantService {
  async FindAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: 'active',
      },
    });
  }
  async createRestaurant(data) {
    return await Restaurant.create(data);
  }

  async findOneRestaurant(id, restaurantId) {
    return await Restaurant.findOne({
      where: {
        status: 'active',
        id: restaurantId || id,
      },
    });
  }
}
