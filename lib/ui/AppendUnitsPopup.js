"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
class AppendUnitsPopup extends skynode_1.Popup {
    constructor(x, y) {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.append-units-popup", skynode_1.el("h2", "Add Units"), this.unitPriceDisplay = skynode_1.el("p.unit-price", "Loading..."), this.input = skynode_1.el("input", { placeholder: "Unit Count" }), skynode_1.el("footer", skynode_1.el("a.submit", "Create", {
            click: async () => {
                const unitCount = parseInt(this.input.domElement.value, 10);
                if (isNaN(unitCount) !== true) {
                    await SixElementsContract_1.default.appendUnits(x, y, unitCount);
                }
                this.delete();
            },
        }), skynode_1.el("a.cancel", "Cancel", { click: () => this.delete() }))));
        this.loadUnitPrice();
    }
    async loadUnitPrice() {
        const energy = await SixElementsContract_1.default.getUnitEnergy();
        this.unitPriceDisplay.empty().appendText(`Energy per Unit: ${energy}`);
    }
}
exports.default = AppendUnitsPopup;
//# sourceMappingURL=AppendUnitsPopup.js.map