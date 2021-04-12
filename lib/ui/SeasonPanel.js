"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
class SeasonPanel extends skynode_1.DomNode {
    constructor() {
        super(".season-panel");
        this.append(this.seasonDisplay = skynode_1.el(".season"), this.rewardDisplay = skynode_1.el(".reward"));
        this.loadSeason();
    }
    async loadSeason() {
        const season = await DefantasyContract_1.default.getSeason();
        this.seasonDisplay.appendText(`Season ${season}`);
        const reward = await DefantasyContract_1.default.getReward(season);
        this.seasonDisplay.appendText(`Reward ${ethers_1.ethers.utils.formatEther(reward)} BNB`);
    }
}
exports.default = SeasonPanel;
//# sourceMappingURL=SeasonPanel.js.map