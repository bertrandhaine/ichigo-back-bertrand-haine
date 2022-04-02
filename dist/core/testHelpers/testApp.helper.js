"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildManyRoutersTestAppHelper = exports.buildTestAppHelper = void 0;
const express_1 = require("express");
const buildTestAppHelper = (buildAppFunction, servicePrefix) => (router, otherPrefix) => {
    return buildAppFunction({
        prefix: `${servicePrefix}${otherPrefix || ''}`,
        router: router,
    });
};
exports.buildTestAppHelper = buildTestAppHelper;
const buildManyRoutersTestAppHelper = (buildAppFunction, servicePrefix) => (routers, otherPrefix) => {
    return buildAppFunction({
        prefix: `${servicePrefix}${otherPrefix || ''}`,
        router: routers.reduce((acc, cur) => acc.use(cur), (0, express_1.Router)()),
    });
};
exports.buildManyRoutersTestAppHelper = buildManyRoutersTestAppHelper;
//# sourceMappingURL=testApp.helper.js.map