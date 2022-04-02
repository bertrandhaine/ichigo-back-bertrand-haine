import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const generateRewards = Router().get(
  '/users/:id/rewards',
  validationMiddleware,
  validatedExpressRequest(route),
);
