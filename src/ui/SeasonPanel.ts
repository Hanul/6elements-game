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
    }

    private async loadSeason() {
        const season = await DefantasyContract.getSeason();
        this.seasonDisplay.appendText(`Season ${season}`);
        const reward = await DefantasyContract.getReward(season);
        this.seasonDisplay.appendText(`Reward ${ethers.utils.formatEther(reward)} BNB`);
    }
}
