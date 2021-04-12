import { DomNode } from "@hanul/skynode";
import DefantasyContract from "../DefantasyContract";

export default class EnergyPanel extends DomNode {

    constructor() {
        super(".energy-panel");
        this.loadEnergy();
    }

    private async loadEnergy() {
        const energy = await DefantasyContract.getEnergy(await DefantasyContract.getPlayerAddress());
        this.appendText(`Your Energy is ${energy}`);
    }
}
