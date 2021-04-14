import { BodyNode, DomNode, el } from "@hanul/skynode";
import DefantasyContract from "../DefantasyContract";
import GameBoard from "../game/GameBoard";
import BuyEnergy from "../ui/BuyEnergy";
import EnergyPanel from "../ui/EnergyPanel";
import SeasonPanel from "../ui/SeasonPanel";

export default class Game extends DomNode {

    constructor() {
        super(".game");
        this.appendTo(BodyNode);
        this.init();
    }

    private async init() {
        await DefantasyContract.loadConstants();

        this.append(
            el("h1", "Defantasy"),
            new SeasonPanel(),
            el("p.game-description", "This is defantasy game."),
            el(".game-board-container",
                new GameBoard(),
            ),
            el(".button-container",
                el("a.button", "Buy Energy", {
                    click: () => new BuyEnergy(),
                }),
                new EnergyPanel(),
                el("a.button", "Be Supporter", {
                    click: () => { },
                }),
            ),
        );
    }
}
