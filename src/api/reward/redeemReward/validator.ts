import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface RedeemRewardValidator {
  params: {
    id: number;
    at: Date;
  };
}

export const redeemRewardValidator = {
  params: validator.object({
    id: validator.number().integer().required(),
    at: validator.date().required(),
  }),
};

export default buildValidationMiddleware(redeemRewardValidator);
