import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';

export interface GenerateRewardsValidator {
  params: {
    id: number;
  };
  query: {
    at: Date;
  };
}

export const generateRewardsValidator = {
  params: validator.object({
    id: validator.number().integer().required(),
  }),
  query: validator.object({
    at: validator.date().required(),
  }),
};

export default buildValidationMiddleware(generateRewardsValidator);
