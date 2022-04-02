import apiRouter from '../api';
import { ensurePath } from '../utils/file';
import config from './config';
import buildApp from './app';

export default (): void => {
  try {
    // we ensure the data folder exists, we use file storage instead of db nor memory because it's easier to switch
    ensurePath(config.REWARD_FILE);

    // we build the app and the routes
    const app = buildApp({
      prefix: '/api',
      router: apiRouter,
    });

    // we expose the api at the following port
    app.listen(config.PORT, () => console.log(`App is running on ${config.PORT} port`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
