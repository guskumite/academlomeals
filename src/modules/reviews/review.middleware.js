import { AppError, catchAsync } from '../errors/index.js';
import { ReviewService } from './review.service.js';

export const validExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await ReviewService.findOneReview(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  req.review = review;
  next();
});
