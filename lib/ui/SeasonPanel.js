"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
class SeasonPanel extends skynode_1.DomNode {
    constructor() {
        super(".season-panel");
        this.buyEnergyHandler = async () => {
            this.loadReward();
        };
        this.append(this.seasonDisplay = skynode_1.el(".season"), this.rewardDisplay = skynode_1.el(".reward"));
        this.loadSeason();
        this.loadReward();
        SixElementsContract_1.default.on("BuyEnergy", this.buyEnergyHandler);
    }
    async loadSeason() {
        const season = await SixElementsContract_1.default.getSeason();
        this.seasonDisplay.empty().appendText(`Season ${season}`);
    }
    async loadReward() {
        const season = await SixElementsContract_1.default.getSeason();
        const reward = await SixElementsContract_1.default.getReward(season.toNumber());
        this.rewardDisplay.empty().appendText(`Reward ${ethers_1.ethers.utils.formatEther(reward)} MATIC`);
    }
    delete() {
        SixElementsContract_1.default.off("BuyEnergy", this.buyEnergyHandler);
        super.delete();
    }
}
exports.default = SeasonPanel;
//# sourceMappingURL=SeasonPanel.js.map