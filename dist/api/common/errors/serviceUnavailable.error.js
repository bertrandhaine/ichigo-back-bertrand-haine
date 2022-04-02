"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const buildError_1 = require("../../../core/buildError");
exports.default = () => (0, buildError_1.buildError)({
    message: 'An error happened with your endpoint. Please try again later.',
    statusCode: http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE,
});
//# sourceMappingURL=serviceUnavailable.error.js.map