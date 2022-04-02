import { Reward } from '../../../entities/reward.entity';
import { rewardSerializer, SerializedReward } from '../../common/serializer/reward.serializer';

export interface SerializedGetAllProducts {
  data: SerializedReward[];
}

export const serializer = (rewards: Reward[]): SerializedGetAllProducts => {
  return {
    data: rewards.map(rewardSerializer),
  };
};
