import { Reward } from '../../../entities/reward.entity';
import {
  RewardRepositoryError,
  RewardRepositoryInterface,
} from '../../../repositories/reward.repository';
import rewardExpiredError from '../../common/errors/rewardExpired.error';
import serviceUnavailableError from '../../common/errors/serviceUnavailable.error';

interface GenerateRewardServiceOptions {
  rewardRepository: RewardRepositoryInterface;
  userId: number;
  generateAt: Date;
}

export const service = async ({
  rewardRepository,
  userId,
  generateAt,
}: GenerateRewardServiceOptions): Promise<Reward> => {
  try {
    return await rewardRepository.redeemReward(userId, generateAt);
  } catch (e: any) {
    if (e.message === RewardRepositoryError.REWARD_EXPIRED) {
      throw rewardExpiredError();
    } else {
      throw serviceUnavailableError();
    }
  }
};
