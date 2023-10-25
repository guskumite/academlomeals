import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const restaurantSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please type at least 3 characters for the name' })
    .max(100, {
      message: 'Please limit the name to a maximum of 100 characters',
    }),
  address: z
    .string()
    .min(10, { message: 'Please type at least 10 characters for the address' })
    .max(100, {
      message: 'Please use a maximum of 100 characters for the address',
    }),
  rating: z
    .number()
    .int()
    .lte(5, { message: 'Please use an integer number between 1 and 5' })
    .gte(1, {
      message: 'Please use an integer number between 1 and 5',
    }),
});

const restaurantUpdateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please type at least 3 characters for the name' })
    .max(100, {
      message: 'Please limit the name to a maximum of 100 characters',
    }),
  address: z
    .string()
    .min(10, { message: 'Please type at least 10 characters for the address' })
    .max(100, {
      message: 'Please use a maximum of 100 characters for the address',
    }),
});

export const validateUpdateRestaurant = (data) => {
  const result = restaurantUpdateSchema.partial().safeParse(data);

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
