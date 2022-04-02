"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../core/middlewares");
const appErrorHandler_middleware_1 = require("../core/middlewares/appErrorHandler.middleware");
const attachLogger_middleware_1 = require("../core/middlewares/attachLogger.middleware");
exports.default = ({ prefix, router }) => (0, express_1.default)()
    .use((0, attachLogger_middleware_1.attachLoggerMiddleware)())
    .use(middlewares_1.jsonParserMiddleware)
    .use(prefix, router)
    .use(appErrorHandler_middleware_1.appErrorHandlerMiddleware);
//# sourceMappingURL=app.js.map