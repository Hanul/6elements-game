import { BodyNode, DomNode, el } from "@hanul/skynode";
import { BigNumber } from "ethers";
import SixElementsContract from "../contracts/SixElementsContract";
import GameBoard from "../game/GameBoard";
import EnergyPanel from "../ui/EnergyPanel";
import SeasonPanel from "../ui/SeasonPanel";

export default class Game extends DomNode {

    constructor() {
        super("#game");
        this.append(
            el("h1", "6 Elements"),
            new SeasonPanel(),
            new GameBoard(),
            new EnergyPanel(),
        );
        this.appendTo(BodyNode);

        SixElementsContract.on("EndGame", (season: BigNumber, winner: string) => {
            //new EndGame(season, winner);
        });
    }
}
