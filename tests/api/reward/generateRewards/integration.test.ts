import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import api from '../../../../src/api';
import RewardRepository from '../../../../src/repositories/reward.repository';
import buildTestApp from '../../../helpers/testApp.helper';
import config from '../../../../src/loader/config';
import { cleanTestRewardFile, deleteTestRewardFile } from '../../../helpers/db/prepareRewards';
import { rewardsFactory } from '../../../helpers/factories/reward.factory';
import { rewardSerializer } from '../../../../src/api/common/serializer/reward.serializer';

const testApp = buildTestApp(api);

describe('test get all product API', () => {
  beforeEach(async () => {
    await cleanTestRewardFile(config.REWARD_FILE);
  });

  afterAll(() => {
    deleteTestRewardFile(config.REWARD_FILE);
  });

  it('should generate correctly the rewards first time', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const generateAt = new Date('2020-03-19T12:00:00.000Z');

    const rewardsBeforeFirstCall = await rewardRepository.getUserAllRewards(userId);

    // before any call, we ensure that db contains no rewards at all
    expect(rewardsBeforeFirstCall).toHaveLength(0);

    const { status, body } = await request(testApp).get(
      `/api/users/${userId}/rewards?at=${generateAt.toISOString()}`,
    );

    const rewardsAfterCall = await rewardRepository.getUserAllRewards(userId);

    const expectedRewards = rewardsFactory(
      new Date('2020-03-15T00:00:00.000Z'),
      new Date('2020-03-21T00:00:00.000Z'),
      userId,
    );

    // after successful api call, we ensure that db contains the desired rewards
    expect(rewardsAfterCall).toMatchObject(expectedRewards);

    expect(status).toBe(StatusCodes.OK);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({ data: expectedRewards.map((r) => rewardSerializer(r)) });
  });

  it('should give correctly the same rewards the second time', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const generateAt = new Date('2020-03-19T12:00:00.000Z');

    // calling first time the endpoint
    await request(testApp).get(`/api/users/${userId}/rewards?at=${generateAt.toISOString()}`);

    const rewardsFirstCall = await rewardRepository.getUserAllRewards(userId);
    expect(rewardsFirstCall).toHaveLength(7);

    // and then calling again
    const { status, body } = await request(testApp).get(
      `/api/users/${userId}/rewards?at=${generateAt.toISOString()}`,
    );

    const expectedRewards = rewardsFactory(
      new Date('2020-03-15T00:00:00.000Z'),
      new Date('2020-03-21T00:00:00.000Z'),
      userId,
    );

    const rewardsSecondCall = await rewardRepository.getUserAllRewards(userId);
    expect(rewardsSecondCall).toHaveLength(7);

    expect(status).toBe(StatusCodes.OK);
    // and we also ensure that the response matches our demands
    expect(body).toMatchObject({ data: expectedRewards.map((r) => rewardSerializer(r)) });
  });

  it('should generate same rewards for another user', async () => {
    const rewardRepository = new RewardRepository(config.REWARD_FILE);
    const userId = 1;
    const userId2 = 2;
    const generateAt = new Date('2020-03-19T12:00:00.000Z');

    // calling first time the endpoint with userId 1
    await request(testApp).get(`/api/users/${userId}/rewards?at=${generateAt.toISOString()}`);

    const rewardsFirstCall = await rewardRepository.getUserAllRewards(userId);
    expect(rewardsFirstCall).toHaveLength(7);

    // and then calling again with another user
    await request(testApp).get(`/api/users/${userId2}/rewards?at=${generateAt.toISOString()}`);

    const secondUserRewards = await rewardRepository.getUserAllRewards(userId2);
    expect(secondUserRewards).toHaveLength(7);

    const expectedRewardsUser1 = rewardsFactory(
      new Date('2020-03-15T00:00:00.000Z'),
      new Date('2020-03-21T00:00:00.000Z'),
      userId,
    );
    const expectedRewardsUser2 = rewardsFactory(
      new Date('2020-03-15T00:00:00.000Z'),
      new Date('2020-03-21T00:00:00.000Z'),
      userId2,
    );
    const expectedRewards = [...expectedRewardsUser1, ...expectedRewardsUser2];

    // we check that db contains all rewards for user 1 and 2
    const allRewards = await rewardRepository.getAllRewards();
    expect(allRewards).toMatchObject(expectedRewards);
  });
});
