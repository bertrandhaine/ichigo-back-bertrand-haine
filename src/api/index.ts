import { Router } from 'express';
import { rewardRouter } from './reward';
import { statusRouter } from './status';

export default Router().use(rewardRouter).use(statusRouter);
