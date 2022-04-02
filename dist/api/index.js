"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reward_1 = require("./reward");
const status_1 = require("./status");
exports.default = (0, express_1.Router)().use(reward_1.rewardRouter).use(status_1.statusRouter);
//# sourceMappingURL=index.js.map