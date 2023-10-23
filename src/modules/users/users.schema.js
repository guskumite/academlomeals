import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const registerUserSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short (minimum 3)' }),
  email: z.string().email({ message: 'Please introduce a valid email' }),
  password: z
    .string()
    .min(12, { message: 'Minimum length for password is 12' })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).{12,}$/, {
      message: 'Please enter a valid password',
    }),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Please introduce a valid email' }),
  password: z
    .string()
    .min(12, { message: 'Minimum length for password is 12' })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).{12,}$/, {
      message: 'Please enter a valid password',
    }),
});

const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'Name is too short (minimum 3)' }),
  password: z
    .string()
    .min(12, { message: 'Minimum length for password is 12' })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?=.*[A-Z])(?=.*[a-z]).{12,}$/, {
      message: 'Please enter a valid password',
    }),
});

export const validateRegister = (data) => {
  const result = registerUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return { hasError, errorMessages, userData };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return { hasError, errorMessages, userData };
};

export const updateUserValidation = (data) => {
  const result = updateUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return { hasError, errorMessages, userData };
};
