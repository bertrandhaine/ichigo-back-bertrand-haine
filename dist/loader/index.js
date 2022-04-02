"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../api"));
const file_1 = require("../utils/file");
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
exports.default = () => {
    try {
        (0, file_1.ensurePath)(config_1.default.REWARD_FILE);
        const app = (0, app_1.default)({
            prefix: '/api',
            router: api_1.default,
        });
        app.listen(config_1.default.PORT, () => console.log(`App is running on ${config_1.default.PORT} port`));
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
//# sourceMappingURL=index.js.map