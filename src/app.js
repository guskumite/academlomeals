import express from 'express';
import { router } from './routes/routes.js';
import { AppError } from './modules/errors/index.js';
import { globalErrorHandler } from './modules/errors/index.js';

const app = express();

app.use(express.json());

// routes

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server! 😱`, 404));
});

app.use(globalErrorHandler);

export default app;
