"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedExpressRequest = void 0;
const validatedExpressRequest = (route) => function requestHandler(req, res, next) {
    return route(req, res, next);
};
exports.validatedExpressRequest = validatedExpressRequest;
//# sourceMappingURL=validatedExpressRequest.js.map