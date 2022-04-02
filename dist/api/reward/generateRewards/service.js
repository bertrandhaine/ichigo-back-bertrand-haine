"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const date_1 = require("../../../utils/date");
const serviceUnavailable_error_1 = __importDefault(require("../../common/errors/serviceUnavailable.error"));
const service = async ({ rewardRepository, userId, generateAt, }) => {
    try {
        const [firstDay, lastDay] = (0, date_1.getFirstAndLastDayOfWeek)(generateAt);
        await rewardRepository.generateEmptyRewards({
            userId,
            from: firstDay,
            to: lastDay,
        });
        return await rewardRepository.getUserRewards({
            userId,
            from: firstDay,
            to: lastDay,
        });
    }
    catch (e) {
        throw (0, serviceUnavailable_error_1.default)();
    }
};
exports.service = service;
//# sourceMappingURL=service.js.map