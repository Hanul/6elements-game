"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
const GameBoard_1 = __importDefault(require("../game/GameBoard"));
const BuyEnergy_1 = __importDefault(require("../ui/BuyEnergy"));
const EndGame_1 = __importDefault(require("../ui/EndGame"));
const EnergyPanel_1 = __importDefault(require("../ui/EnergyPanel"));
const SeasonPanel_1 = __importDefault(require("../ui/SeasonPanel"));
class Game extends skynode_1.DomNode {
    constructor() {
        super(".game");
        this.appendTo(skynode_1.BodyNode);
        this.init();
    }
    async init() {
        await DefantasyContract_1.default.loadConstants();
        this.append(skynode_1.el("h1", "Defantasy"), new SeasonPanel_1.default(), skynode_1.el("p.game-description", "This is defantasy game."), skynode_1.el(".game-board-container", new GameBoard_1.default()), skynode_1.el(".button-container", skynode_1.el("a.button", "Buy Energy", {
            click: () => new BuyEnergy_1.default(),
        }), new EnergyPanel_1.default(), skynode_1.el("a.button", "Be Supporter", {
            click: () => alert("In dev"),
        })));
        DefantasyContract_1.default.on("EndGame", (season, winner) => {
            new EndGame_1.default(season, winner);
        });
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map