"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
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
        this.mapWidth = await DefantasyContract_1.default.getMapWidth();
        this.mapHeight = await DefantasyContract_1.default.getMapHeight();
        this.empty();
        this.style({
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });
        skyutil_1.default.repeat(this.mapHeight, (y) => {
            skyutil_1.default.repeat(this.mapWidth, (x) => {
                this.cells[`${x},${y}`] = new Cell_1.default(x, y).appendTo(this);
            });
        });
    }
}
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map