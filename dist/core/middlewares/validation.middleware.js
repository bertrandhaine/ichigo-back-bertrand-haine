"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildValidationMiddleware = void 0;
const joi_1 = __importStar(require("joi"));
const http_status_codes_1 = require("http-status-codes");
const DEFAULT_ERROR_MESSAGE = 'Bad Request';
const JOI_OPTIONS = { abortEarly: false };
function buildValidator(schema) {
    return joi_1.default.object({
        headers: joi_1.default.any(),
        params: joi_1.default.any(),
        query: joi_1.default.any(),
        cookies: joi_1.default.any(),
        body: joi_1.default.any(),
        file: joi_1.default.any(),
        ...schema,
    })
        .required()
        .min(1);
}
const buildErrorMessage = (options) => { var _a; return (_a = options === null || options === void 0 ? void 0 : options.message) !== null && _a !== void 0 ? _a : DEFAULT_ERROR_MESSAGE; };
const buildErrorResponse = (error, options) => ({
    error: {
        message: buildErrorMessage(options),
        context: {
            validationErrors: error.details.map((detail) => {
                var _a;
                return ({
                    name: (_a = detail.context) === null || _a === void 0 ? void 0 : _a.key,
                    message: detail.message,
                    path: detail.path,
                    type: detail.type,
                });
            }),
        },
    },
});
function validate(validator, data) {
    const result = validator.validate(data, JOI_OPTIONS);
    if (result.error) {
        throw result.error;
    }
    return result.value;
}
function buildValidationMiddleware(schema, options) {
    return function validationMiddleware(request, response, next) {
        const { headers, params, query, body, cookies, file } = request;
        try {
            const validator = buildValidator(schema);
            const validationResult = validate(validator, {
                headers,
                params,
                query,
                body,
                cookies,
                file,
            });
            request.headers = validationResult.headers;
            request.params = validationResult.params;
            request.query = validationResult.query;
            request.cookies = validationResult.cookies;
            request.body = validationResult.body;
            request.file = validationResult.file;
            return next();
        }
        catch (error) {
            if (error.isJoi && error instanceof joi_1.ValidationError) {
                const validationResponse = buildErrorResponse(error, options);
                return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(validationResponse);
            }
            return next(error);
        }
    };
}
exports.buildValidationMiddleware = buildValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map