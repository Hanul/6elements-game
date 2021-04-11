"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Contract_1 = __importDefault(require("./Contract"));
const GameBoard_1 = __importDefault(require("./game/GameBoard"));
const RewardPanel_1 = __importDefault(require("./ui/RewardPanel"));
(async () => {
    await Contract_1.default.loadConstants();
    skynode_1.el("div", {
        style: {
            width: 534,
        },
    }, skynode_1.el("h1", "Defantasy"), skynode_1.el("p.game-description", "This is defantasy game."), new RewardPanel_1.default(), skynode_1.el(".game-board-container", new GameBoard_1.default()), skynode_1.el(".button-container", skynode_1.el("a.button", "Be Summoner", {
        click: () => { },
    }), skynode_1.el("a.button", "Buy Energy", {
        click: () => Contract_1.default.buyEnergy(10),
    }), skynode_1.el("a.button", "Be Supporter", {
        click: () => { },
    }))).appendTo(skynode_1.BodyNode);
})();
//# sourceMappingURL=main.js.map