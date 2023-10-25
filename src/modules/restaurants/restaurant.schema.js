import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const restaurantSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().min(10).max(100),
  rating: z.number().int().lte(5),
});

export const validateRestaurant = (data) => {
  const result = restaurantSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
};
