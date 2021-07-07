"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
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
        this.load();
        SixElementsContract_1.default.on("JoinGame", this.joinGameHandler);
        SixElementsContract_1.default.on("CreateArmy", this.createArmyHandler);
        SixElementsContract_1.default.on("AppendUnits", this.appendUnitsHandler);
        SixElementsContract_1.default.on("Attack", this.attackHandler);
    }
    checkAllies(address, x, y) {
        var _a;
        let count = 0;
        for (const cell of Object.values(this.cells)) {
            if (((_a = cell.army) === null || _a === void 0 ? void 0 : _a.armyData.owner) === address) {
                count += 1;
                if (Math.abs(cell.x - x) + Math.abs(cell.y - y) <= 1) {
                    return true;
                }
            }
        }
        return count === 0;
    }
    async load() {
        this.mapWidth = await SixElementsContract_1.default.getMapWidth();
        this.mapHeight = await SixElementsContract_1.default.getMapHeight();
        this.empty();
        this.style({
            width: this.mapWidth * 44 + 8,
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
        SixElementsContract_1.default.off("JoinGame", this.joinGameHandler);
        SixElementsContract_1.default.off("CreateArmy", this.createArmyHandler);
        SixElementsContract_1.default.off("AppendUnits", this.appendUnitsHandler);
        SixElementsContract_1.default.off("Attack", this.attackHandler);
        super.delete();
    }
}
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map