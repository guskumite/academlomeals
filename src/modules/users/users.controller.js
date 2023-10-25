import {
  encryptedPassword,
  verifyPassword,
} from '../config/plugins/encriptedPassword.js';
import generateJWT from '../config/plugins/generateJWT.js';
import { AppError, catchAsync } from '../errors/index.js';
import {
  deleteUserValidation,
  updateUserValidation,
  validateLogin,
  validateRegister,
} from './users.schema.js';
import { UserService } from './users.services.js';

const userservice = new UserService();

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  // to show if it happened an error or not after we validated the login data that comes in the req.body

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      messages: errorMessages,
    });
  }

  // now we invoke the findUserByEmail function defined in the users.services

  const user = await userservice.findUserByEmail(userData.email);

  // if a user register is not found must return an error via the AppError

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  // it is necessary to compare the password that comes from the req.body with the one stored in the
  // database to verify correct matching. For that, it is neccesary to invoke a function from
  // the plugins

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Once we assure that the password is correct, it is necessary to generate a valid token for the session

  const token = await generateJWT(user.id);

  // Finally we return the token to the user via the res.status

  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
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
  // Update user profile (Actualizar perfil de usuario)

  const { hasError, errorMessages, userData } = updateUserValidation(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      messages: errorMessages,
    });
  }

  // now we invoke the findUserByEmail function defined in the users.services

  const user = await userservice.findUserByEmail(userData.email);

  // if a user register is not found must return an error via the AppError

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  // Get the current user data

  const { sessionUser } = req;

  // Get the data to change from the userData

  const newName = userData.newName;
  const currentPassword = userData.currentPassword;

  let thePassword;
  if (!userData.newPassword) {
    thePassword = userData.currentPassword;
  } else {
    thePassword = userData.newPassword;
  }

  // Validate if the current password sent in the req.body is equal to the password of the session user

  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If all of the above is correct we must be able to modify the data on the db

  // Crypt the new password

  let hashedNewPassword;
  if (thePassword !== userData.currentPassword) {
    hashedNewPassword = await encryptedPassword(thePassword);
  } else {
    hashedNewPassword = await user.dataValues.password;
  }

  // update the data to the db

  if (newName) {
    user.dataValues.name = newName;
  }

  const updatedUser = await userservice.updateUser(sessionUser, {
    password: hashedNewPassword,
    name: user.dataValues.name,
    changedPasswordAt: new Date(),
  });

  return res.status(200).json({
    message: 'The user data has been updated successfully',
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = deleteUserValidation(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'Error',
      messages: errorMessages,
    });
  }

  // now we invoke the findUserByEmail function defined in the users.services

  const user = await userservice.findUserByEmail(userData.email);

  // if a user register is not found must return an error via the AppError

  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  // Get the current user data

  const { sessionUser } = req;

  let currentPassword = userData.password;

  // Validate if the current password sent in the req.body is equal to the password of the session user

  const isCorrectPassword = await verifyPassword(
    currentPassword,
    sessionUser.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If all of the above is correct we must be able to modify the data on the db

  const deletedUser = await userservice.deleteUser(sessionUser);

  return res.status(200).json({
    message: 'The user has been deleted successfully',
  });
});
