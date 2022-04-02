import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import config from '../../../loader/config';
import RewardRepository from '../../../repositories/reward.repository';
import { serializer } from './serializer';
import { service } from './service';
import { GenerateRewardsValidator } from './validator';

type GenerateRewardRequest = ValidatedRequest<GenerateRewardsValidator>;

export default async (
  req: GenerateRewardRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { at } = req.query;
    const { id } = req.params;

    const rewards = await service({
      userId: id,
      generateAt: at,
      rewardRepository: new RewardRepository(config.REWARD_FILE),
    });

    const response = serializer(rewards);

    return res.send(response).status(StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};
