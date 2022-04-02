import fs from 'fs';
import jsonfile from 'jsonfile';

export async function cleanTestRewardFile(rewardFilePath: string): Promise<void> {
  await jsonfile.writeFile(rewardFilePath, []);
}

export function deleteTestRewardFile(rewardFilePath: string): void {
  // cleaning the file
  fs.unlinkSync(rewardFilePath);
}
