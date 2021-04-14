import { DomNode, el, Popup } from "@hanul/skynode";
import { ethers } from "ethers";
import DefantasyContract from "../DefantasyContract";

export default class BuyEnergy extends Popup {

    private input: DomNode<HTMLInputElement>;

    constructor() {
        super(".popup");
        this.append(el(".content.buy-energy",
            this.input = el("input", { placeholder: "Energy" }),
            el("a.submit", "Buy",
                {
                    click: async () => {
                        const energy = parseInt(this.input.domElement.value, 10);
                        if (isNaN(energy) !== true) {
                            await DefantasyContract.buyEnergy(energy);
                        }
                        this.delete();
                    },
                },
            ),
            el(".energy-price", `Energy Price: ${ethers.utils.formatEther(DefantasyContract.ENERGY_PRICE)} BNB`),
        ));
    }
}
