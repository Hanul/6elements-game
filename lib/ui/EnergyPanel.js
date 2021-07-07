"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const BuyEnergyPopup_1 = __importDefault(require("./BuyEnergyPopup"));
class EnergyPanel extends skynode_1.DomNode {
    constructor() {
        super(".energy-panel");
        this.reloadEnergyHandler = async (player) => {
            if (await Wallet_1.default.loadAddress() === player) {
                this.loadEnergy();
            }
        };
        this.append(this.energyDisplay = skynode_1.el(".energy"), skynode_1.el("a.buy-button", "Buy Energy", {
            click: () => new BuyEnergyPopup_1.default(),
        }));
        SixElementsContract_1.default.on("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract_1.default.on("UseEnergy", this.reloadEnergyHandler);
        this.loadEnergy();
    }
    async loadEnergy() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const energy = await SixElementsContract_1.default.getEnergy(address);
            this.energyDisplay.empty().appendText(`Your Energy ${energy}`);
        }
    }
    delete() {
        SixElementsContract_1.default.off("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract_1.default.off("UseEnergy", this.reloadEnergyHandler);
        super.delete();
    }
}
exports.default = EnergyPanel;
//# sourceMappingURL=EnergyPanel.js.map