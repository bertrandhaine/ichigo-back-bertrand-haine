"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const joi_1 = __importDefault(require("joi"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
exports.validator = joi_1.default.extend((joi) => ({
    base: joi.string(),
    type: 'string',
    rules: {
        htmlStrip: {
            validate(value) {
                return (0, sanitize_html_1.default)(value, { allowedTags: [] });
            },
        },
    },
}));
exports.default = joi_1.default;
//# sourceMappingURL=validator.js.map