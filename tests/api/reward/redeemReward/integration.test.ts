import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import api from '../../../../src/api';
import RewardRepository from '../../../../src/repositories/reward.repository';
import buildTestApp from '../../../helpers/testApp.helper';
import config from '../../../../src/loader/config';
import { cleanTestRewardFile, deleteTestRewardFile } from '../../../helpers/db/prepareRewards';
import { rewardSerializer } from '../../../../src/api/common/serializer/reward.serializer';
import { compareDateWithoutTime } from '../../../../src/utils/date';

const testApp = buildTestApp(api);

describe('test get all product API', () => {
  beforeEach(async () => {
    await cleanTestRewardFile(config.REWARD_FILE);
  });

  afterAll(() => {
    deleteTestRewardFile(config.REWARD_FILE);
  });

  it('should redeem reward that is already generated', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const redeemAt = new Date('2020-03-19T12:00:00.000Z');

    // we first generate the empty rewards
    await rewardRepository.generateEmptyRewards({
      userId,
      from: new Date('2020-03-13T12:00:00.000Z'),
      to: new Date('2020-03-21T12:00:00.000Z'),
    });

    const { status, body } = await request(testApp).patch(
      `/api/users/${userId}/rewards/${redeemAt.toISOString()}/redeem`,
    );

    const userRewards = await rewardRepository.getUserAllRewards(userId);

    userRewards.forEach((reward) => {
      if (compareDateWithoutTime(reward.availableAt, redeemAt)) {
        expect(reward.redeemedAt).toEqual(redeemAt);
      } else {
        expect(reward.redeemedAt).toEqual(null);
      }
    });

    expect(status).toBe(StatusCodes.OK);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({
      data: rewardSerializer({
        redeemedAt: redeemAt,
        availableAt: new Date('2020-03-19T00:00:00.000Z'),
        expiresAt: new Date('2020-03-20T00:00:00.000Z'),
        userId,
      }),
    });
  });

  it('should give redeem date for a reward already redeemed with the same params', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const redeemAt = new Date('2020-03-19T12:00:00.000Z');
    const previousRedeemAt = new Date('2020-03-19T12:00:00.000Z');

    // we first generate the empty rewards
    await rewardRepository.generateEmptyRewards({
      userId,
      from: new Date('2020-03-13T12:00:00.000Z'),
      to: new Date('2020-03-21T12:00:00.000Z'),
    });

    await rewardRepository.redeemReward(userId, previousRedeemAt);

    const { status, body } = await request(testApp).patch(
      `/api/users/${userId}/rewards/${redeemAt.toISOString()}/redeem`,
    );

    const userRewards = await rewardRepository.getUserAllRewards(userId);

    userRewards.forEach((reward) => {
      if (compareDateWithoutTime(reward.availableAt, redeemAt)) {
        expect(reward.redeemedAt).toEqual(previousRedeemAt);
      } else {
        expect(reward.redeemedAt).toEqual(null);
      }
    });

    expect(status).toBe(StatusCodes.OK);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({
      data: rewardSerializer({
        redeemedAt: previousRedeemAt,
        availableAt: new Date('2020-03-19T00:00:00.000Z'),
        expiresAt: new Date('2020-03-20T00:00:00.000Z'),
        userId,
      }),
    });
  });

  it('should NOT redeem reward that is outdated', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const redeemAt = new Date('2020-03-25T12:00:00.000Z');

    // we first generate the empty rewards
    await rewardRepository.generateEmptyRewards({
      userId,
      from: new Date('2020-03-13T12:00:00.000Z'),
      to: new Date('2020-03-21T12:00:00.000Z'),
    });

    const { status, body } = await request(testApp).patch(
      `/api/users/${userId}/rewards/${redeemAt.toISOString()}/redeem`,
    );

    const userRewards = await rewardRepository.getUserAllRewards(userId);

    userRewards.forEach((reward) => {
      expect(reward.redeemedAt).toEqual(null);
    });

    expect(status).toBe(StatusCodes.FORBIDDEN);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({
      error: {
        message: 'This reward is already expired',
      },
    });
  });

  it('should NOT redeem reward that is available, but for another user', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const otherUserId = 100;
    const redeemAt = new Date('2020-03-19T12:00:00.000Z');

    // we first generate the empty rewards
    await rewardRepository.generateEmptyRewards({
      userId,
      from: new Date('2020-03-13T12:00:00.000Z'),
      to: new Date('2020-03-21T12:00:00.000Z'),
    });

    const { status, body } = await request(testApp).patch(
      `/api/users/${otherUserId}/rewards/${redeemAt.toISOString()}/redeem`,
    );

    const allRewards = await rewardRepository.getAllRewards();

    allRewards.forEach((reward) => {
      expect(reward.redeemedAt).toEqual(null);
    });

    expect(status).toBe(StatusCodes.FORBIDDEN);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({
      error: {
        message: 'This reward is already expired',
      },
    });
  });
});
