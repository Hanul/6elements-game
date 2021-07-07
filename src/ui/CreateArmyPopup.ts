import { DomNode, el, Popup } from "@hanul/skynode";
import SixElementsContract from "../contracts/SixElementsContract";
import { ArmyKind } from "../game/ArmyData";

class ArmyKindButton extends DomNode {

    constructor(title: string, public kind: ArmyKind, handler: (button: ArmyKindButton) => void) {
        super("a.army-kind-button");
        this.append(el("img", { src: `/images/units/${title}.png` }));
        this.onDom("click", () => handler(this));
    }

    public select() { this.addClass("on"); }
    public deselect() { this.deleteClass("on"); }
}

export default class CreateArmyPopup extends Popup {

    public content: DomNode;

    private armyKind = ArmyKind.Fire;
    private selArmyKindButton: ArmyKindButton;
    private input: DomNode<HTMLInputElement>;
    private unitPriceDisplay: DomNode;

    constructor(x: number, y: number) {
        super(".popup");
        this.append(this.content = el(".content.create-army-popup",

            el("h2", "Create Army"),
            this.unitPriceDisplay = el("p.unit-price", "Loading..."),

            this.selArmyKindButton = new ArmyKindButton("fire", ArmyKind.Fire, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("water", ArmyKind.Water, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("wind", ArmyKind.Wind, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("earth", ArmyKind.Earth, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("light", ArmyKind.Light, (button) => this.selectArmyKindButton(button)),
            new ArmyKindButton("dark", ArmyKind.Dark, (button) => this.selectArmyKindButton(button)),

            this.input = el("input", { placeholder: "Unit Count" }),

            el("footer",
                el("a.submit", "Create",
                    {
                        click: async () => {
                            const unitCount = parseInt(this.input.domElement.value, 10);
                            if (isNaN(unitCount) !== true) {
                                await SixElementsContract.createArmy(x, y, this.armyKind, unitCount);
                            }
                            this.delete();
                        },
                    },
                ),
                el("a.cancel", "Cancel", { click: () => this.delete() }),
            ),
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
        const energy = await SixElementsContract.getUnitEnergy();
        this.unitPriceDisplay.empty().appendText(`Energy per Unit: ${energy}`);
    }
}
