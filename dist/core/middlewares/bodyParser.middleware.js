"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodedParserMiddleware = exports.jsonParserMiddleware = exports.buildURLEncodedParserMiddleware = exports.buildJSONParserMiddleware = void 0;
const body_parser_1 = require("body-parser");
const buildJSONParserMiddleware = (options) => (0, body_parser_1.json)(options);
exports.buildJSONParserMiddleware = buildJSONParserMiddleware;
const buildURLEncodedParserMiddleware = (options) => (0, body_parser_1.urlencoded)({ extended: true, ...options });
exports.buildURLEncodedParserMiddleware = buildURLEncodedParserMiddleware;
exports.jsonParserMiddleware = (0, exports.buildJSONParserMiddleware)();
exports.urlEncodedParserMiddleware = (0, exports.buildURLEncodedParserMiddleware)();
//# sourceMappingURL=bodyParser.middleware.js.map