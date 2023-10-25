import { updateReview } from '../restaurants/restaurant.controller.js';
import User from '../users/users.model.js';
import Review from './review.model.js';

export class ReviewService {
  // declared static for special invoking from the middleware (it eliminates the need for instantation)
  static async findOneReview(id) {
    return Review.findOne({
      where: {
        status: 'active',
        id,
      },
      include: [
        {
          model: User,
          as: 'ReviewToUser',
        },
      ],
    });
  }

  static async create(data) {
    return await Review.create(data);
  }

  static async updateReview(data, id) {
    return await Review.update(data, {
      where: {
        id,
        status: 'active',
      },
    });
  }
}
