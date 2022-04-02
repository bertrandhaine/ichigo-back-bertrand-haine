"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardRouter = void 0;
const express_1 = require("express");
const generateRewards_1 = require("./generateRewards");
const redeemReward_1 = require("./redeemReward");
exports.rewardRouter = (0, express_1.Router)().use(generateRewards_1.generateRewards).use(redeemReward_1.redeemReward);
//# sourceMappingURL=index.js.map