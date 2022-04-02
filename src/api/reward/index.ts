import { Router } from 'express';
import { generateRewards } from './generateRewards';
import { redeemReward } from './redeemReward';

export const rewardRouter = Router().use(generateRewards).use(redeemReward);
