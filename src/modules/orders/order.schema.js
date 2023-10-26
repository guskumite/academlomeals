import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const orderSchema = z.object({
  mealId: z.number().int(),
  userId: z.number().int(),
  totalPrice: z.number().int(),
  quantity: z.number().int(),
  status: z.enum('active', 'cancelled', 'completed'),
});

export const validateOrder = (data) => {
  const result = orderSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: orderData,
  } = extractValidationData(result);

  return { hasError, errorMessages, orderData };
};
