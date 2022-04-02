"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFactory = void 0;
function buildFactory(schema) {
    return (args) => ({
        ...schema,
        ...args,
    });
}
exports.buildFactory = buildFactory;
//# sourceMappingURL=buildFactory.js.map