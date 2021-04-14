import { DomNode, el } from "@hanul/skynode";
import { ethers } from "ethers";
import DefantasyContract from "../DefantasyContract";

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
        DefantasyContract.on("BuyEnergy", this.buyEnergyHandler);
    }

    private buyEnergyHandler = async () => {
        this.loadReward();
    };

    private async loadSeason() {
        const season = await DefantasyContract.getSeason();
        this.seasonDisplay.empty().appendText(`Season ${season}`);
    }

    private async loadReward() {
        const reward = await DefantasyContract.getReward(await DefantasyContract.getSeason());
        this.rewardDisplay.empty().appendText(`Reward ${ethers.utils.formatEther(reward)} BNB`);
    }

    public delete() {
        DefantasyContract.off("BuyEnergy", this.buyEnergyHandler);
        super.delete();
    }
}
