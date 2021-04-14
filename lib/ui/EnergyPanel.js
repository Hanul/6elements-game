"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
class EnergyPanel extends skynode_1.DomNode {
    constructor() {
        super(".energy-panel");
        this.buyEnergyHandler = async (player) => {
            if (await DefantasyContract_1.default.getPlayerAddress() === player) {
                this.loadEnergy();
            }
        };
        this.loadEnergy();
        DefantasyContract_1.default.on("BuyEnergy", this.buyEnergyHandler);
    }
    async loadEnergy() {
        const energy = await DefantasyContract_1.default.getEnergy(await DefantasyContract_1.default.getPlayerAddress());
        this.empty().appendText(`Your Energy is ${energy}`);
    }
    delete() {
        DefantasyContract_1.default.off("BuyEnergy", this.buyEnergyHandler);
        super.delete();
    }
}
exports.default = EnergyPanel;
//# sourceMappingURL=EnergyPanel.js.map