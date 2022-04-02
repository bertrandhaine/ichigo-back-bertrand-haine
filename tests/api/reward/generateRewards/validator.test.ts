import { validatorHelper } from '../../../../src/core/testHelpers';
import { generateRewardsValidator } from '../../../../src/api/reward/generateRewards/validator';

const { isValid } = validatorHelper(generateRewardsValidator);

describe('generateRewards validator', () => {
  it('should validate data', () => {
    const validData = {
      params: {
        id: 1,
      },
      query: {
        at: '2020-02-19T20:10:03Z',
      },
    };
    expect(isValid(validData)).toBe(true);
  });
  it('should not validate data - invalid date', () => {
    const validData = {
      params: {
        id: 1,
      },
      query: {
        at: '2020-02-19T20:10:0322222Z',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
  it('should not validate data - ud not defined', () => {
    const validData = {
      params: {},
      query: {
        at: '2020-02-19T20:10:03Z',
      },
    };
    expect(isValid(validData)).toBe(false);
  });
});
