import jsonfile from 'jsonfile';
import { Reward } from '../entities/reward.entity';
import { compareDateWithoutTime } from '../utils/date';

export interface UserRewardsParams {
  userId: number;
  from: Date;
  to: Date;
}

export enum RewardRepositoryError {
  REWARD_EXPIRED = 'REWARD_EXPIRED',
  GENERATION_ERROR = 'GENERATION_ERROR',
}

export interface RewardRepositoryInterface {
  getUserRewards(params: UserRewardsParams): Promise<Reward[]>;
  getAllRewards(): Promise<Reward[]>;
  getUserAllRewards(userId: number): Promise<Reward[]>;
  generateEmptyRewards(params: UserRewardsParams): Promise<void>;
  redeemReward(userId: number, redeemDate: Date): Promise<Reward>;
}

export default class RewardRepository implements RewardRepositoryInterface {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async generateEmptyRewards({ userId, from, to }: UserRewardsParams): Promise<void> {
    try {
      const allRewards = await this.getAllRewards();
      const userRewards = allRewards.filter((r) => r.userId === userId);

      let loop = new Date(from);
      loop.setUTCHours(0, 0, 0, 0);
      while (loop <= to) {
        const rewardIndex = userRewards.findIndex(
          (r) => r.availableAt.getTime() === loop.getTime(),
        );

        if (rewardIndex === -1) {
          allRewards.push({
            availableAt: new Date(loop),
            redeemedAt: null,
            expiresAt: new Date(loop.getTime() + 1000 * 60 * 60 * 24),
            userId,
          });
        }

        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }

      await jsonfile.writeFile(this.path, allRewards);
    } catch (e) {
      throw new Error(RewardRepositoryError.GENERATION_ERROR);
    }
  }

  async redeemReward(userId: number, redeemDate: Date): Promise<Reward> {
    const allRewards = await this.getAllRewards();

    const rewardToRedeemIndex = allRewards.findIndex(
      (r) => compareDateWithoutTime(r.availableAt, redeemDate) && r.userId === userId,
    );

    const rewardToRedeem = allRewards[rewardToRedeemIndex];

    // if reward was not generated
    if (!rewardToRedeem) {
      throw new Error(RewardRepositoryError.REWARD_EXPIRED);
    }

    // in the case reward was already redeemed, we return the reward with its redeemedAt date
    if (rewardToRedeem.redeemedAt) {
      return rewardToRedeem;
    }

    allRewards[rewardToRedeemIndex].redeemedAt = redeemDate;

    await jsonfile.writeFile(this.path, allRewards);

    return allRewards[rewardToRedeemIndex];
  }

  async getUserRewards({ userId, from, to }: UserRewardsParams): Promise<Reward[]> {
    try {
      const allRewards = await this.getAllRewards();
      const userRewards = allRewards.filter((r) => r.userId === userId);

      return userRewards.filter((r) => r.availableAt >= from && r.availableAt <= to);
    } catch (e: any) {
      return [];
    }
  }

  async getUserAllRewards(userId: number): Promise<Reward[]> {
    try {
      const allRewards = await this.getAllRewards();
      return allRewards.filter((r) => r.userId === userId);
    } catch (e: any) {
      return [];
    }
  }

  async getAllRewards(): Promise<Reward[]> {
    try {
      const data = await jsonfile.readFile(this.path);
      const rewards = data ?? [];

      return rewards.map((r: any) => ({
        availableAt: new Date(r.availableAt),
        expiresAt: new Date(r.expiresAt),
        redeemedAt: r.redeemedAt ? new Date(r.redeemedAt) : null,
        userId: r.userId,
      }));
    } catch (e: any) {
      // if file doesn't exists then it will be created
      if (e.code === 'ENOENT') {
        await jsonfile.writeFile(this.path, []);
        return [];
      }
      return [];
    }
  }
}
