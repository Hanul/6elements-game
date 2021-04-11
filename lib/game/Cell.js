"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Contract_1 = __importDefault(require("../Contract"));
const ArmyData_1 = require("./ArmyData");
class Cell extends skynode_1.DomNode {
    constructor(x, y) {
        super("a.cell");
        this.on("click", async () => {
            await Contract_1.default.joinGame(x, y, ArmyData_1.ArmyKind.Fire, 1);
        });
    }
}
exports.default = Cell;
//# sourceMappingURL=Cell.js.map