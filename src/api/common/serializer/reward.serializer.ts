import { Reward } from '../../../entities/reward.entity';

export interface SerializedReward {
  availableAt: string;
  redeemedAt: string | null;
  expiresAt: string;
}

export const rewardSerializer = (reward: Reward): SerializedReward => ({
  availableAt: reward.availableAt?.toISOString(),
  redeemedAt: reward.redeemedAt?.toISOString() ?? null,
  expiresAt: reward.expiresAt?.toISOString(),
});
