"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRewards = void 0;
const express_1 = require("express");
const validatedExpressRequest_1 = require("../../../core/utils/validatedExpressRequest");
const route_1 = __importDefault(require("./route"));
const validator_1 = __importDefault(require("./validator"));
exports.generateRewards = (0, express_1.Router)().get('/users/:id/rewards', validator_1.default, (0, validatedExpressRequest_1.validatedExpressRequest)(route_1.default));
//# sourceMappingURL=index.js.map