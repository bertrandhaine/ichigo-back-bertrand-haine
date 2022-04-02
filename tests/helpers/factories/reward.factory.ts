import { faker } from '@faker-js/faker';
import { buildFactory } from '../../../src/core/testHelpers';
import { Reward } from '../../../src/entities/reward.entity';

const buildSchema = (): Reward => {
  return {
    availableAt: faker.datatype.datetime(),
    redeemedAt: null,
    expiresAt: faker.datatype.datetime(),
    userId: faker.datatype.number(),
  };
};

export const rewardFactory = (args?: Partial<Reward>): Reward =>
  buildFactory<Reward>({
    ...buildSchema(),
  })(args);

export const rewardsFactory = (from: Date, to: Date, userId: number): Reward[] => {
  const rewards: Reward[] = [];
  let loop = new Date(from);
  while (loop <= to) {
    rewards.push({
      availableAt: new Date(loop),
      redeemedAt: null,
      expiresAt: new Date(loop.getTime() + 1000 * 60 * 60 * 24),
      userId,
    });

    const newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
  }
  return rewards;
};
