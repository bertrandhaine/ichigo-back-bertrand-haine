"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemRewardValidator = void 0;
const middlewares_1 = require("../../../core/middlewares");
const validator_1 = require("../../../core/validator");
exports.redeemRewardValidator = {
    params: validator_1.validator.object({
        id: validator_1.validator.number().integer().required(),
        at: validator_1.validator.date().required(),
    }),
};
exports.default = (0, middlewares_1.buildValidationMiddleware)(exports.redeemRewardValidator);
//# sourceMappingURL=validator.js.map