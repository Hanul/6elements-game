"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
class BuyEnergyPopup extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.buy-energy-popup", skynode_1.el("h2", "Buy Energy"), skynode_1.el("p", `Energy Price: ${ethers_1.ethers.utils.formatEther(SixElementsContract_1.default.ENERGY_PRICE)} MATIC`), this.input = skynode_1.el("input", { placeholder: "Energy" }), skynode_1.el("footer", skynode_1.el("a.submit", "Buy", {
            click: async () => {
                const energy = parseInt(this.input.domElement.value, 10);
                if (isNaN(energy) !== true) {
                    await SixElementsContract_1.default.buyEnergy(energy);
                }
                this.delete();
            },
        }), skynode_1.el("a.cancel", "Cancel", { click: () => this.delete() }))));
    }
}
exports.default = BuyEnergyPopup;
//# sourceMappingURL=BuyEnergyPopup.js.map