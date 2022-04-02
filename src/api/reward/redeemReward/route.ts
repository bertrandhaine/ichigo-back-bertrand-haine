import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidatedRequest } from '../../../core/utils/validatedExpressRequest';
import config from '../../../loader/config';
import RewardRepository from '../../../repositories/reward.repository';
import { serializer } from './serializer';
import { service } from './service';
import { RedeemRewardValidator } from './validator';

type GenerateRewardRequest = ValidatedRequest<RedeemRewardValidator>;

export default async (
  req: GenerateRewardRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { at, id } = req.params;

    const redeemedReward = await service({
      userId: id,
      generateAt: at,
      rewardRepository: new RewardRepository(config.REWARD_FILE),
    });

    const response = serializer(redeemedReward);

    return res.send(response).status(StatusCodes.OK);
  } catch (error) {
    return next(error);
  }
};
