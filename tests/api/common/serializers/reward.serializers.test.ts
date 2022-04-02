import { rewardSerializer } from '../../../../src/api/common/serializer/reward.serializer';
import { rewardFactory } from '../../../helpers/factories/reward.factory';

describe('rewardSerializer', () => {
  it('should serialize reward', () => {
    const reward = rewardFactory();
    const serializedReward = rewardSerializer(reward);

    expect(serializedReward).toEqual({
      availableAt: reward.availableAt?.toISOString(),
      expiresAt: reward.expiresAt?.toISOString(),
      redeemedAt: null,
    });
  });
});
