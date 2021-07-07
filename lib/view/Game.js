"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
const GameBoard_1 = __importDefault(require("../game/GameBoard"));
const EnergyPanel_1 = __importDefault(require("../ui/EnergyPanel"));
const SeasonPanel_1 = __importDefault(require("../ui/SeasonPanel"));
class Game extends skynode_1.DomNode {
    constructor() {
        super("#game");
        this.append(skynode_1.el("h1", "6 Elements"), new SeasonPanel_1.default(), new GameBoard_1.default(), new EnergyPanel_1.default());
        this.appendTo(skynode_1.BodyNode);
        SixElementsContract_1.default.on("EndGame", (season, winner) => {
        });
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map