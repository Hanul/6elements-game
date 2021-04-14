import { DomNode, el, Popup } from "@hanul/skynode";
import { ethers } from "ethers";
import DefantasyContract from "../DefantasyContract";

export default class AppendUnits extends Popup {

    private input: DomNode<HTMLInputElement>;
    private unitPriceDisplay: DomNode;

    constructor(x: number, y: number) {
        super(".popup");
        this.append(el(".content.append-units",
            this.input = el("input", { placeholder: "Unit Count" }),
            el("a.submit", "Create",
                {
                    click: async () => {
                        const unitCount = parseInt(this.input.domElement.value, 10);
                        if (isNaN(unitCount) !== true) {
                            await DefantasyContract.appendUnits(x, y, unitCount);
                        }
                        this.delete();
                    },
                },
            ),
            el("a.cancel", "Cancel", { click: () => this.delete() }),
            this.unitPriceDisplay = el(".unit-price", "Loading..."),
        ));
        this.loadUnitPrice();
    }

    private async loadUnitPrice() {
        this.unitPriceDisplay.empty().appendText(`Summon Energy per Unit: ${ethers.utils.formatEther(await DefantasyContract.getUnitEnergy())} BNB`);
    }
}
