import { validatorHelper } from '../../../../src/core/testHelpers';
import { redeemRewardValidator } from '../../../../src/api/reward/redeemReward/validator';

const { isValid } = validatorHelper(redeemRewardValidator);

describe('redeemReward validator', () => {
  it('should validate data', () => {
    const validData = {
      params: {
        id: 1,
        at: '2020-02-19T20:10:03Z',
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data - invalid date', () => {
    const validData = {
      params: {
        id: 1,
        at: '2020-02-19T20:10:0322222Z',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - ud not defined', () => {
    const validData = {
      params: {
        at: '2020-02-19T20:10:03Z',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
});
