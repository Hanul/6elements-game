"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
const ArmyData_1 = require("../game/ArmyData");
class ArmyKindButton extends skynode_1.DomNode {
    constructor(title, kind, handler) {
        super("a.army-kind-button");
        this.kind = kind;
        this.append(skynode_1.el("img", { src: `/images/units/${title}.png` }));
        this.onDom("click", () => handler(this));
    }
    select() { this.addClass("on"); }
    deselect() { this.deleteClass("on"); }
}
class CreateArmyPopup extends skynode_1.Popup {
    constructor(x, y) {
        super(".popup");
        this.armyKind = ArmyData_1.ArmyKind.Fire;
        this.append(this.content = skynode_1.el(".content.create-army-popup", skynode_1.el("h2", "Create Army"), this.unitPriceDisplay = skynode_1.el("p.unit-price", "Loading..."), this.selArmyKindButton = new ArmyKindButton("fire", ArmyData_1.ArmyKind.Fire, (button) => this.selectArmyKindButton(button)), new ArmyKindButton("water", ArmyData_1.ArmyKind.Water, (button) => this.selectArmyKindButton(button)), new ArmyKindButton("wind", ArmyData_1.ArmyKind.Wind, (button) => this.selectArmyKindButton(button)), new ArmyKindButton("earth", ArmyData_1.ArmyKind.Earth, (button) => this.selectArmyKindButton(button)), new ArmyKindButton("light", ArmyData_1.ArmyKind.Light, (button) => this.selectArmyKindButton(button)), new ArmyKindButton("dark", ArmyData_1.ArmyKind.Dark, (button) => this.selectArmyKindButton(button)), this.input = skynode_1.el("input", { placeholder: "Unit Count" }), skynode_1.el("footer", skynode_1.el("a.submit", "Create", {
            click: async () => {
                const unitCount = parseInt(this.input.domElement.value, 10);
                if (isNaN(unitCount) !== true) {
                    await SixElementsContract_1.default.createArmy(x, y, this.armyKind, unitCount);
                }
                this.delete();
            },
        }), skynode_1.el("a.cancel", "Cancel", { click: () => this.delete() }))));
        this.selArmyKindButton.select();
        this.loadUnitPrice();
    }
    selectArmyKindButton(button) {
        this.armyKind = button.kind;
        this.selArmyKindButton.deselect();
        this.selArmyKindButton = button;
        this.selArmyKindButton.select();
    }
    async loadUnitPrice() {
        const energy = await SixElementsContract_1.default.getUnitEnergy();
        this.unitPriceDisplay.empty().appendText(`Energy per Unit: ${energy}`);
    }
}
exports.default = CreateArmyPopup;
//# sourceMappingURL=CreateArmyPopup.js.map