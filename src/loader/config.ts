export interface AppConfig {
  REWARD_FILE: string;
  NODE_ENV: string;
  PORT: number;
}

const REQUIRED_VARIABLES: string[] = [];

function checkRequiredVariables(config: NodeJS.ProcessEnv): void {
  REQUIRED_VARIABLES.forEach((key): void => {
    if (!config[key] || config[key] === '') {
      throw new Error(`${key} env variable is required`);
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseConfig(config: any): AppConfig {
  return {
    NODE_ENV: config.NODE_ENV ?? 'development',
    PORT: config.PORT ?? 8082,
    REWARD_FILE: config.NODE_ENV === 'test' ? './tests/data/rewards.json' : './data/rewards.json',
  };
}

function buildConfig(config = process.env): AppConfig {
  checkRequiredVariables(config);
  return parseConfig(config);
}

export default buildConfig();
