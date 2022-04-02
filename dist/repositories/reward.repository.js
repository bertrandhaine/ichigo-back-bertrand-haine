"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardRepositoryError = void 0;
const jsonfile_1 = __importDefault(require("jsonfile"));
const date_1 = require("../utils/date");
var RewardRepositoryError;
(function (RewardRepositoryError) {
    RewardRepositoryError["REWARD_EXPIRED"] = "REWARD_EXPIRED";
    RewardRepositoryError["GENERATION_ERROR"] = "GENERATION_ERROR";
})(RewardRepositoryError = exports.RewardRepositoryError || (exports.RewardRepositoryError = {}));
class RewardRepository {
    constructor(path) {
        this.path = path;
    }
    async generateEmptyRewards({ userId, from, to }) {
        try {
            const allRewards = await this.getAllRewards();
            const userRewards = allRewards.filter((r) => r.userId === userId);
            let loop = new Date(from);
            loop.setUTCHours(0, 0, 0, 0);
            while (loop <= to) {
                const rewardIndex = userRewards.findIndex((r) => r.availableAt.getTime() === loop.getTime());
                if (rewardIndex === -1) {
                    allRewards.push({
                        availableAt: new Date(loop),
                        redeemedAt: null,
                        expiresAt: new Date(loop.getTime() + 1000 * 60 * 60 * 24),
                        userId,
                    });
                }
                const newDate = loop.setDate(loop.getDate() + 1);
                loop = new Date(newDate);
            }
            await jsonfile_1.default.writeFile(this.path, allRewards);
        }
        catch (e) {
            throw new Error(RewardRepositoryError.GENERATION_ERROR);
        }
    }
    async redeemReward(userId, redeemDate) {
        const allRewards = await this.getAllRewards();
        const rewardToRedeemIndex = allRewards.findIndex((r) => (0, date_1.compareDateWithoutTime)(r.availableAt, redeemDate) && r.userId === userId);
        const rewardToRedeem = allRewards[rewardToRedeemIndex];
        if (!rewardToRedeem) {
            throw new Error(RewardRepositoryError.REWARD_EXPIRED);
        }
        if (rewardToRedeem.redeemedAt) {
            return rewardToRedeem;
        }
        allRewards[rewardToRedeemIndex].redeemedAt = redeemDate;
        await jsonfile_1.default.writeFile(this.path, allRewards);
        return allRewards[rewardToRedeemIndex];
    }
    async getUserRewards({ userId, from, to }) {
        try {
            const allRewards = await this.getAllRewards();
            const userRewards = allRewards.filter((r) => r.userId === userId);
            return userRewards.filter((r) => r.availableAt >= from && r.availableAt <= to);
        }
        catch (e) {
            return [];
        }
    }
    async getUserAllRewards(userId) {
        try {
            const allRewards = await this.getAllRewards();
            return allRewards.filter((r) => r.userId === userId);
        }
        catch (e) {
            return [];
        }
    }
    async getAllRewards() {
        try {
            const data = await jsonfile_1.default.readFile(this.path);
            const rewards = data !== null && data !== void 0 ? data : [];
            return rewards.map((r) => ({
                availableAt: new Date(r.availableAt),
                expiresAt: new Date(r.expiresAt),
                redeemedAt: r.redeemedAt ? new Date(r.redeemedAt) : null,
                userId: r.userId,
            }));
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                await jsonfile_1.default.writeFile(this.path, []);
                return [];
            }
            return [];
        }
    }
}
exports.default = RewardRepository;
//# sourceMappingURL=reward.repository.js.map