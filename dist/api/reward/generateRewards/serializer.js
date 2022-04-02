"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializer = void 0;
const reward_serializer_1 = require("../../common/serializer/reward.serializer");
const serializer = (rewards) => {
    return {
        data: rewards.map(reward_serializer_1.rewardSerializer),
    };
};
exports.serializer = serializer;
//# sourceMappingURL=serializer.js.map