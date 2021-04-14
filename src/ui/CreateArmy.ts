import { DomNode, el, Popup } from "@hanul/skynode";
import { ethers } from "ethers";
import DefantasyContract from "../DefantasyContract";
import { ArmyKind } from "../game/ArmyData";

class ArmyKindButton extends DomNode {

    constructor(title: string, public kind: ArmyKind, handler: (button: ArmyKindButton) => void) {
        super("a.army-kind-button");
        this.append(el("img", { src: `/images/units/${title}.png` }));
        this.on("click", () => handler(this));
    }

    public select() { this.addClass("on"); }
    public deselect() { this.deleteClass("on"); }
}

export default class CreateArmy extends Popup {

    private armyKind = ArmyKind.Fire;
    private selArmyKindButton: ArmyKindButton;
    private input: DomNode<HTMLInputElement>;
    private unitPriceDisplay: DomNode;

    constructor(x: number, y: number) {
        super(".popup");
        this.append(el(".content.create-army",
            this.selArmyKindButton = new ArmyKindButton("fire", ArmyKind.Fire, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("water", ArmyKind.Water, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("wind", ArmyKind.Wind, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("earth", ArmyKind.Earth, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("light", ArmyKind.Light, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("dark", ArmyKind.Dark, (button) => this.selectArmyKindButton(button)),
            this.input = el("input", { placeholder: "Unit Count" }),
            el("a.submit", "Create",
                {
                    click: async () => {
                        const unitCount = parseInt(this.input.domElement.value, 10);
                        if (isNaN(unitCount) !== true) {
                            await DefantasyContract.createArmy(x, y, this.armyKind, unitCount);
                        }
                        this.delete();
                    },
                },
            ),
            el("a.cancel", "Cancel", { click: () => this.delete() }),
            this.unitPriceDisplay = el(".unit-price", "Loading..."),
        ));
        this.selArmyKindButton.select();
        this.loadUnitPrice();
    }

    private selectArmyKindButton(button: ArmyKindButton) {
        this.armyKind = button.kind;
        this.selArmyKindButton.deselect();
        this.selArmyKindButton = button;
        this.selArmyKindButton.select();
    }

    private async loadUnitPrice() {
        this.unitPriceDisplay.empty().appendText(`Summon Energy per Unit: ${ethers.utils.formatEther(await DefantasyContract.getUnitEnergy())} BNB`);
    }
}
