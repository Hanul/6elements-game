"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const Contract_1 = __importDefault(require("../Contract"));
const Cell_1 = __importDefault(require("./Cell"));
class GameBoard extends skynode_1.DomNode {
    constructor() {
        super(".gameboard");
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.cells = {};
        this.armies = {};
        this.loadBoard();
    }
    async loadBoard() {
        this.mapWidth = await Contract_1.default.getMapWidth();
        this.mapHeight = await Contract_1.default.getMapHeight();
        this.empty();
        this.style({
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });
        await skyutil_1.default.repeat(this.mapHeight, async (y) => {
            await skyutil_1.default.repeat(this.mapWidth, async (x) => {
                this.cells[`${x},${y}`] = new Cell_1.default(x, y).appendTo(this);
                const armyData = await Contract_1.default.getArmy(x, y);
                console.log(armyData);
            });
        });
    }
}
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map