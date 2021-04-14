"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
const Army_1 = __importDefault(require("./Army"));
const ArmyData_1 = require("./ArmyData");
class CellMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(x, y) {
        super({ left: -999999, top: 999999 }, ".cell-menu");
        this.append(skynode_1.el(".menu", "Create", {
            click: async () => await DefantasyContract_1.default.createArmy(x, y, ArmyData_1.ArmyKind.Fire, 1),
        }));
    }
}
class Cell extends skynode_1.DomNode {
    constructor(gameBoard, x, y) {
        super("a.cell");
        this.gameBoard = gameBoard;
        this.x = x;
        this.y = y;
        this.on("click", async () => {
            if (this.army === undefined) {
                const menu = new CellMenu(this.x, this.y).appendTo(this);
                const rect = this.rect;
                menu.style({
                    left: rect.left + window.scrollX + (rect.width - menu.rect.width) / 2,
                    top: rect.top + window.scrollY - menu.rect.height - 10,
                });
            }
        });
        this.loadArmy();
    }
    async loadArmy() {
        const armyData = await DefantasyContract_1.default.getArmy(this.x, this.y);
        if (armyData !== undefined) {
            this.army = new Army_1.default(this.gameBoard, armyData).appendTo(this);
        }
    }
}
exports.default = Cell;
//# sourceMappingURL=Cell.js.map