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
        this.joinGameHandler = async (player, x, y, kind, unitCount) => {
            const cell = this.cells[`${x},${y}`];
            cell === null || cell === void 0 ? void 0 : cell.loadArmy();
        };
        this.createArmyHandler = async (player, x, y, kind, unitCount) => {
            const cell = this.cells[`${x},${y}`];
            cell === null || cell === void 0 ? void 0 : cell.loadArmy();
        };
        this.appendUnitsHandler = async (player, x, y, unitCount) => {
            const cell = this.cells[`${x},${y}`];
            cell === null || cell === void 0 ? void 0 : cell.loadArmy();
        };
        this.attackHandler = async (player, fromX, fromY, toX, toY) => {
            const fromCell = this.cells[`${fromX},${fromY}`];
            const toCell = this.cells[`${toX},${toY}`];
            fromCell === null || fromCell === void 0 ? void 0 : fromCell.loadArmy();
            toCell === null || toCell === void 0 ? void 0 : toCell.loadArmy();
        };
        this.loadBoard();
        DefantasyContract_1.default.on("JoinGame", this.joinGameHandler);
        DefantasyContract_1.default.on("CreateArmy", this.createArmyHandler);
        DefantasyContract_1.default.on("AppendUnits", this.appendUnitsHandler);
        DefantasyContract_1.default.on("Attack", this.attackHandler);
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
                this.cells[`${x},${y}`] = new Cell_1.default(this, x, y).appendTo(this);
            });
        });
    }
    delete() {
        DefantasyContract_1.default.off("JoinGame", this.joinGameHandler);
        DefantasyContract_1.default.off("CreateArmy", this.createArmyHandler);
        DefantasyContract_1.default.off("AppendUnits", this.appendUnitsHandler);
        DefantasyContract_1.default.off("Attack", this.attackHandler);
        super.delete();
    }
}
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map