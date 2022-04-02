"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const reward_repository_1 = require("../../../repositories/reward.repository");
const rewardExpired_error_1 = __importDefault(require("../../common/errors/rewardExpired.error"));
const serviceUnavailable_error_1 = __importDefault(require("../../common/errors/serviceUnavailable.error"));
const service = async ({ rewardRepository, userId, generateAt, }) => {
    try {
        return await rewardRepository.redeemReward(userId, generateAt);
    }
    catch (e) {
        if (e.message === reward_repository_1.RewardRepositoryError.REWARD_EXPIRED) {
            throw (0, rewardExpired_error_1.default)();
        }
        else {
            throw (0, serviceUnavailable_error_1.default)();
        }
    }
};
exports.service = service;
//# sourceMappingURL=service.js.map