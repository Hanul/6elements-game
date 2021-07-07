import { DomNode, el } from "@hanul/skynode";
import { ethers } from "ethers";
import SixElementsContract from "../contracts/SixElementsContract";

export default class SeasonPanel extends DomNode {

    private seasonDisplay: DomNode;
    private rewardDisplay: DomNode;

    constructor() {
        super(".season-panel");
        this.append(
            this.seasonDisplay = el(".season"),
            this.rewardDisplay = el(".reward"),
        );
        this.loadSeason();
        this.loadReward();
        SixElementsContract.on("BuyEnergy", this.buyEnergyHandler);
    }

    private buyEnergyHandler = async () => {
        this.loadReward();
    };

    private async loadSeason() {
        const season = await SixElementsContract.getSeason();
        this.seasonDisplay.empty().appendText(`Season ${season}`);
    }

    private async loadReward() {
        const season = await SixElementsContract.getSeason();
        const reward = await SixElementsContract.getReward(season.toNumber());
        this.rewardDisplay.empty().appendText(`Reward ${ethers.utils.formatEther(reward)} MATIC`);
    }

    public delete() {
        SixElementsContract.off("BuyEnergy", this.buyEnergyHandler);
        super.delete();
    }
}
