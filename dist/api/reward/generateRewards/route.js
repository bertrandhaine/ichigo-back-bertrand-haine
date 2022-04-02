"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../loader/config"));
const reward_repository_1 = __importDefault(require("../../../repositories/reward.repository"));
const serializer_1 = require("./serializer");
const service_1 = require("./service");
exports.default = async (req, res, next) => {
    try {
        const { at } = req.query;
        const { id } = req.params;
        const rewards = await (0, service_1.service)({
            userId: id,
            generateAt: at,
            rewardRepository: new reward_repository_1.default(config_1.default.REWARD_FILE),
        });
        const response = (0, serializer_1.serializer)(rewards);
        return res.send(response).status(http_status_codes_1.StatusCodes.OK);
    }
    catch (error) {
        return next(error);
    }
};
//# sourceMappingURL=route.js.map