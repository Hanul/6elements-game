"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Contract_1 = __importDefault(require("../Contract"));
class RewardPanel extends skynode_1.DomNode {
    constructor() {
        super(document.createElement("div"));
        Contract_1.default.test();
    }
}
exports.default = RewardPanel;
//# sourceMappingURL=RewardPanel.js.map