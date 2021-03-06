"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorHelper = void 0;
const joi_1 = __importDefault(require("joi"));
function useValidator(schema, args) {
    return joi_1.default.object({ ...schema }).validate(args);
}
function validatorHelper(schema) {
    return {
        isValid: (args) => useValidator(schema, args).error === undefined,
        getParsedData: (args) => {
            const { value, error } = useValidator(schema, args);
            if (error) {
                throw error;
            }
            return value;
        },
    };
}
exports.validatorHelper = validatorHelper;
//# sourceMappingURL=validator.helper.js.map