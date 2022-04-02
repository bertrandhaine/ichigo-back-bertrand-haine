"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const redact_object_1 = __importDefault(require("redact-object"));
const pino_1 = __importDefault(require("pino"));
const DEFAULT_LOG_LEVEL = 'info';
const SECRET_FIELDS = [
    'authorization',
    'x-access-token',
    'x-refresh-token',
    'password',
    'refreshToken',
    'number',
    'expiration',
    'cvc',
];
const parseLogErrorData = (input) => input instanceof Error ? { error: input, context: undefined } : input;
const isProduction = process.env.NODE_ENV === 'production';
const silentLog = (silent = false) => silent && isProduction;
class Logger {
    constructor() {
        this.pinoLogger = (0, pino_1.default)({
            level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
            enabled: process.env.NODE_ENV !== 'test',
            transport: !isProduction
                ? {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                    },
                }
                : undefined,
        });
    }
    attachRequest(req) {
        this.request = req;
    }
    debug({ message, context, silent }) {
        if (!silentLog(silent)) {
            this.pinoLogger.debug(this.buildContext(context), message);
        }
    }
    error(opt) {
        const { error, context, message } = parseLogErrorData(opt);
        this.pinoLogger.error({ ...this.buildContext(context), err: error }, message || error.message);
    }
    info({ message, context, silent }) {
        if (!silentLog(silent)) {
            this.pinoLogger.info(this.buildContext(context), message);
        }
    }
    trace({ message, context, silent }) {
        if (!silentLog(silent)) {
            this.pinoLogger.trace(this.buildContext(context), message);
        }
    }
    warn({ message, context, silent }) {
        if (!silentLog(silent)) {
            this.pinoLogger.warn(this.buildContext(context), message);
        }
    }
    buildContext(context) {
        return {
            ...this.redact(context),
            requestID: this.request ? this.request.header('requestid') : undefined,
        };
    }
    redact(data) {
        try {
            return (0, redact_object_1.default)(data, SECRET_FIELDS, '[Redacted]');
        }
        catch (error) {
            if (error.message === 'Unsupported value for redaction') {
                return data;
            }
            throw error;
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map