import { DomNode, el } from "@hanul/skynode";
import SixElementsContract from "../contracts/SixElementsContract";
import Wallet from "../ethereum/Wallet";
import BuyEnergyPopup from "./BuyEnergyPopup";

export default class EnergyPanel extends DomNode {

    private energyDisplay: DomNode;

    constructor() {
        super(".energy-panel");
        this.append(
            this.energyDisplay = el(".energy"),
            el("a.buy-button", "Buy Energy", {
                click: () => new BuyEnergyPopup(),
            }),
        );
        SixElementsContract.on("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract.on("UseEnergy", this.reloadEnergyHandler);
        this.loadEnergy();
    }

    private reloadEnergyHandler = async (player: string) => {
        if (await Wallet.loadAddress() === player) {
            this.loadEnergy();
        }
    };

    private async loadEnergy() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const energy = await SixElementsContract.getEnergy(address);
            this.energyDisplay.empty().appendText(`Your Energy ${energy}`);
        }
    }

    public delete() {
        SixElementsContract.off("BuyEnergy", this.reloadEnergyHandler);
        SixElementsContract.off("UseEnergy", this.reloadEnergyHandler);
        super.delete();
    }
}
