import { DomNode } from "@hanul/skynode";
import DefantasyContract from "../DefantasyContract";

export default class EnergyPanel extends DomNode {

    constructor() {
        super(".energy-panel");
        this.loadEnergy();
        DefantasyContract.on("BuyEnergy", this.reloadEnergyHandler);
        DefantasyContract.on("UseEnergy", this.reloadEnergyHandler);
    }

    private reloadEnergyHandler = async (player: string) => {
        if (await DefantasyContract.getPlayerAddress() === player) {
            this.loadEnergy();
        }
    };

    private async loadEnergy() {
        const energy = await DefantasyContract.getEnergy(await DefantasyContract.getPlayerAddress());
        this.empty().appendText(`Your Energy is ${energy}`);
    }

    public delete() {
        DefantasyContract.off("BuyEnergy", this.reloadEnergyHandler);
        DefantasyContract.off("UseEnergy", this.reloadEnergyHandler);
        super.delete();
    }
}
