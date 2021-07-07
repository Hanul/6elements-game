"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const DefantasyContract_1 = __importDefault(require("../../old/DefantasyContract"));
class AppendUnits extends skynode_1.Popup {
    constructor(x, y) {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.append-units", this.input = skynode_1.el("input", { placeholder: "Unit Count" }), skynode_1.el("a.submit", "Create", {
            click: async () => {
                const unitCount = parseInt(this.input.domElement.value, 10);
                if (isNaN(unitCount) !== true) {
                    await DefantasyContract_1.default.appendUnits(x, y, unitCount);
                }
                this.delete();
            },
        }), skynode_1.el("a.cancel", "Cancel", { click: () => this.delete() }), this.unitPriceDisplay = skynode_1.el(".unit-price", "Loading...")));
        this.loadUnitPrice();
    }
    async loadUnitPrice() {
        this.unitPriceDisplay.empty().appendText(`Summon Energy per Unit: ${ethers_1.ethers.utils.formatEther(await DefantasyContract_1.default.getUnitEnergy())} BNB`);
    }
}
exports.default = AppendUnits;
//# sourceMappingURL=AppendUnits.js.map