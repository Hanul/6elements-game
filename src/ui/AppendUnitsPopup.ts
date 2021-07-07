import { DomNode, el, Popup } from "@hanul/skynode";
import SixElementsContract from "../contracts/SixElementsContract";

export default class AppendUnitsPopup extends Popup {

    public content: DomNode;

    private input: DomNode<HTMLInputElement>;
    private unitPriceDisplay: DomNode;

    constructor(x: number, y: number) {
        super(".popup");
        this.append(this.content = el(".content.append-units-popup",

            el("h2", "Add Units"),
            this.unitPriceDisplay = el("p.unit-price", "Loading..."),

            this.input = el("input", { placeholder: "Unit Count" }),

            el("footer",
                el("a.submit", "Create",
                    {
                        click: async () => {
                            const unitCount = parseInt(this.input.domElement.value, 10);
                            if (isNaN(unitCount) !== true) {
                                await SixElementsContract.appendUnits(x, y, unitCount);
                            }
                            this.delete();
                        },
                    },
                ),
                el("a.cancel", "Cancel", { click: () => this.delete() }),
            ),
        ));
        this.loadUnitPrice();
    }

    private async loadUnitPrice() {
        const energy = await SixElementsContract.getUnitEnergy();
        this.unitPriceDisplay.empty().appendText(`Energy per Unit: ${energy}`);
    }
}
