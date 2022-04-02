"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REQUIRED_VARIABLES = [];
function checkRequiredVariables(config) {
    REQUIRED_VARIABLES.forEach((key) => {
        if (!config[key] || config[key] === '') {
            throw new Error(`${key} env variable is required`);
        }
    });
}
function parseConfig(config) {
    var _a, _b;
    return {
        NODE_ENV: (_a = config.NODE_ENV) !== null && _a !== void 0 ? _a : 'development',
        PORT: (_b = config.PORT) !== null && _b !== void 0 ? _b : 8082,
        REWARD_FILE: config.NODE_ENV === 'test' ? './tests/data/rewards.json' : './data/rewards.json',
    };
}
function buildConfig(config = process.env) {
    checkRequiredVariables(config);
    return parseConfig(config);
}
exports.default = buildConfig();
//# sourceMappingURL=config.js.map