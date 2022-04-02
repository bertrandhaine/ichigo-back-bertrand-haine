"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appErrorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
function appErrorHandlerMiddleware(error, req, res, next) {
    if (error.type && error.type === 'entity.parse.failed') {
        req.logger.warn({ message: 'Improper body JSON payload' });
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            message: 'Improper body JSON payload',
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            code: 'bad-body-json',
        });
    }
    if (error.isAppError) {
        const { statusCode, message } = error;
        req.logger.warn({
            message: 'Request finished with AppError',
            context: { message, statusCode, error },
        });
        return res.status(statusCode).send({
            error: {
                message,
            },
        });
    }
    if (process.env.NODE_ENV === 'production') {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error',
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
    next(error);
}
exports.appErrorHandlerMiddleware = appErrorHandlerMiddleware;
//# sourceMappingURL=appErrorHandler.middleware.js.map