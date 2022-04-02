export interface Reward {
  availableAt: Date;
  redeemedAt: Date | null;
  expiresAt: Date;
  userId: number;
}

export class RewardEntity implements Reward {
  availableAt: Date;
  redeemedAt: Date | null;
  expiresAt: Date;
  userId: number;
}
