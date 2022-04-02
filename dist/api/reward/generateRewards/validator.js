"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRewardsValidator = void 0;
const middlewares_1 = require("../../../core/middlewares");
const validator_1 = require("../../../core/validator");
exports.generateRewardsValidator = {
    params: validator_1.validator.object({
        id: validator_1.validator.number().integer().required(),
    }),
    query: validator_1.validator.object({
        at: validator_1.validator.date().required(),
    }),
};
exports.default = (0, middlewares_1.buildValidationMiddleware)(exports.generateRewardsValidator);
//# sourceMappingURL=validator.js.map