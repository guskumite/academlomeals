import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const reviewSchema = z.object({
  comment: z.string().min(3).max(200),
  rating: z.number().int().lte(5),
});

export const validateReview = (data) => {
  const result = reviewSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    reviewData,
  };
};
