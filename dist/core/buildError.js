"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor({ statusCode, message }) {
        super(message);
        this.isAppError = true;
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        this.message = message;
    }
}
function buildError(args) {
    return new AppError(args);
}
exports.buildError = buildError;
//# sourceMappingURL=buildError.js.map