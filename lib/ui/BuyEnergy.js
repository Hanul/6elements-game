"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const DefantasyContract_1 = __importDefault(require("../DefantasyContract"));
class BuyEnergy extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(skynode_1.el(".content.buy-energy", this.input = skynode_1.el("input", { placeholder: "Energy" }), skynode_1.el("a.submit", "Buy", {
            click: async () => {
                const energy = parseInt(this.input.domElement.value, 10);
                if (isNaN(energy) !== true) {
                    await DefantasyContract_1.default.buyEnergy(energy);
                }
                this.delete();
            },
        }), skynode_1.el("a.cancel", "Cancel", { click: () => this.delete() }), skynode_1.el(".energy-price", `Energy Price: ${ethers_1.ethers.utils.formatEther(DefantasyContract_1.default.ENERGY_PRICE)} BNB`)));
    }
}
exports.default = BuyEnergy;
//# sourceMappingURL=BuyEnergy.js.map