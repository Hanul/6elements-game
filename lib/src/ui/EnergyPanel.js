"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
const BuyEnergyPopup_1 = __importDefault(require("./BuyEnergyPopup"));
class EnergyPanel extends skynode_1.DomNode {
    constructor() {
        super(".energy-panel");
        this.reloadEnergyHandler = async (player) => {
            if (await SixElementsContract_1.default.getPlayerAddress() === player) {
                this.loadEnergy();
            }
        };
        this.append(this.energyDisplay = skynode_1.el(".energy"), skynode_1.el("a.buy-button", "Buy Energy", {
            click: () => new BuyEnergyPopup_1.default(),
        }));
        SixElementsContract_1.default.on("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract_1.default.on("UseEnergy", this.reloadEnergyHandler);
    }
    async loadEnergy() {
        const energy = await SixElementsContract_1.default.getEnergy(await SixElementsContract_1.default.getPlayerAddress());
        this.empty().appendText(`Your Energy is ${energy}`);
    }
    delete() {
        SixElementsContract_1.default.off("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract_1.default.off("UseEnergy", this.reloadEnergyHandler);
        super.delete();
    }
}
exports.default = EnergyPanel;
//# sourceMappingURL=EnergyPanel.js.map