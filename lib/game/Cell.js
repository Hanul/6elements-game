"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
const Army_1 = __importDefault(require("./Army"));
const ArmyData_1 = require("./ArmyData");
class Cell extends skynode_1.DomNode {
    constructor(x, y) {
        super("a.cell");
        this.x = x;
        this.y = y;
        this.on("click", async () => {
            if (this.army === undefined) {
                await DefantasyContract_1.default.createArmy(x, y, ArmyData_1.ArmyKind.Fire, 1);
            }
        });
        this.loadArmy();
    }
    async loadArmy() {
        const armyData = await DefantasyContract_1.default.getArmy(this.x, this.y);
        if (armyData !== undefined) {
            this.army = new Army_1.default(armyData).appendTo(this);
        }
    }
}
exports.default = Cell;
//# sourceMappingURL=Cell.js.map