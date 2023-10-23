//importar catchAsync

import generateJWT from '../config/plugins/generateJWT.js';
import { catchAsync } from '../errors/index.js';
import { validateRegister } from './users.schema.js';
import { UserService } from './users.services.js';

const userservice = new UserService();

export const login = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      message: errorMessages,
    });
  }

  const user = await userservice.createUser(userData);

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

export const findAllUser = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const updateUser = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  return res.status(200).json(/* valor a retornar */);
});
