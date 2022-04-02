import { Router } from 'express';

import route from './route';

export const statusRouter = Router()
  .get('/status/healthcheck', route)
  .head('/status/healthcheck', route);
