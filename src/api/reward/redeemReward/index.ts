import { Router } from 'express';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';
import validationMiddleware from './validator';

export const redeemReward = Router().patch(
  '/users/:id/rewards/:at/redeem',
  validationMiddleware,
  validatedExpressRequest(route),
);
