import { DomNode, el, Popup } from "@hanul/skynode";
import { ethers } from "ethers";
import SixElementsContract from "../contracts/SixElementsContract";

export default class BuyEnergyPopup extends Popup {

    public content: DomNode;

    private input: DomNode<HTMLInputElement>;

    constructor() {
        super(".popup");
        this.append(this.content = el(".content.buy-energy-popup",

            el("h2", "Buy Energy"),
            el("p", `Energy Price: ${ethers.utils.formatEther(SixElementsContract.ENERGY_PRICE)} MATIC`),

            this.input = el("input", { placeholder: "Energy" }),

            el("footer",
                el("a.submit", "Buy",
                    {
                        click: async () => {
                            const energy = parseInt(this.input.domElement.value, 10);
                            if (isNaN(energy) !== true) {
                                await SixElementsContract.buyEnergy(energy);
                            }
                            this.delete();
                        },
                    },
                ),
                el("a.cancel", "Cancel", { click: () => this.delete() }),
            ),
        ));
    }
}
