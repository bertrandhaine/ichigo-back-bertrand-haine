"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardSerializer = void 0;
const rewardSerializer = (reward) => {
    var _a, _b, _c, _d;
    return ({
        availableAt: (_a = reward.availableAt) === null || _a === void 0 ? void 0 : _a.toISOString(),
        redeemedAt: (_c = (_b = reward.redeemedAt) === null || _b === void 0 ? void 0 : _b.toISOString()) !== null && _c !== void 0 ? _c : null,
        expiresAt: (_d = reward.expiresAt) === null || _d === void 0 ? void 0 : _d.toISOString(),
    });
};
exports.rewardSerializer = rewardSerializer;
//# sourceMappingURL=reward.serializer.js.map