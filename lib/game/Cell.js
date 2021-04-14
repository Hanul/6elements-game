"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
const CreateArmy_1 = __importDefault(require("../ui/CreateArmy"));
const Army_1 = __importDefault(require("./Army"));
class CellMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(x, y) {
        super({ left: -999999, top: 999999 }, ".cell-menu");
        this.append(skynode_1.el("a.menu", "Create", {
            click: () => {
                new CreateArmy_1.default(x, y);
                this.delete();
            },
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
                const menu = new CellMenu(this.x, this.y).appendTo(gameBoard);
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