"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachLoggerMiddleware = void 0;
const express_1 = require("express");
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const logger_1 = require("../logger");
const isHealthCheck = (req) => req.path.includes('/status/healthcheck');
const logMiddleware = (req, res, next) => {
    const logger = new logger_1.Logger();
    req.logger = logger;
    logger.attachRequest(req);
    if (isHealthCheck(req)) {
        return next();
    }
    return next((0, express_pino_logger_1.default)({ logger: logger.pinoLogger })(req, res));
};
const attachLoggerMiddleware = function attachLoggerMiddlewareFn() {
    return (0, express_1.Router)().use(logMiddleware);
};
exports.attachLoggerMiddleware = attachLoggerMiddleware;
//# sourceMappingURL=attachLogger.middleware.js.map