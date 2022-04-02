"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function ensurePath(file) {
    const dir = path_1.default.dirname(file);
    try {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
    }
    catch (e) {
        console.log(e);
    }
}
exports.ensurePath = ensurePath;
//# sourceMappingURL=file.js.map