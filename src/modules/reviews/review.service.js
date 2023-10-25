import Review from './review.model.js';

export class ReviewService {
  // declared static for special invoking from the middleware (it eliminates the need for instantation)
  static async findOneReview(id) {
    return Review.findOne({
      where: {
        status: 'active',
        id,
      },
    });
  }

  static async create(data) {
    return await Review.create(data);
  }
}
