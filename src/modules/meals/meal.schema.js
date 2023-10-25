import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const mealSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please type at least 3 characters for the name' })
    .max(100, {
      message: 'Please limit the name to a maximum of 100 characters',
    }),
  price: z
    .number()
    .int()
    .gte(1, { message: 'The minumum price is 1' })
    .lte(1000000, { message: 'The maximum price is 1000000' }),
});

export const validateMeal = (data) => {
  const result = mealSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return { hasError, errorMessages, mealData };
};

export const validateUpdateMeal = (data) => {
  const result = mealSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);

  return { hasError, errorMessages, mealData };
};
