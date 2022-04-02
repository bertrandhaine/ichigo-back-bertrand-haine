"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const express_1 = require("express");
const route_1 = __importDefault(require("./route"));
exports.statusRouter = (0, express_1.Router)()
    .get('/status/healthcheck', route_1.default)
    .head('/status/healthcheck', route_1.default);
//# sourceMappingURL=index.js.map