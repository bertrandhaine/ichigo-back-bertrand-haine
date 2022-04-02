import { Reward } from '../../../entities/reward.entity';
import { RewardRepositoryInterface } from '../../../repositories/reward.repository';
import { getFirstAndLastDayOfWeek } from '../../../utils/date';
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
}: GenerateRewardServiceOptions): Promise<Reward[]> => {
  try {
    const [firstDay, lastDay] = getFirstAndLastDayOfWeek(generateAt);

    // first we generate the rewards, if it's already redeemed, nothing will change
    await rewardRepository.generateEmptyRewards({
      userId,
      from: firstDay,
      to: lastDay,
    });

    // we then get all the rewards for the user
    return await rewardRepository.getUserRewards({
      userId,
      from: firstDay,
      to: lastDay,
    });
  } catch (e) {
    throw serviceUnavailableError();
  }
};
