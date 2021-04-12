import { BodyNode, el } from "@hanul/skynode";
import DefantasyContract from "./DefantasyContract";
import GameBoard from "./game/GameBoard";
import BuyEnergy from "./ui/BuyEnergy";
import EnergyPanel from "./ui/EnergyPanel";
import SeasonPanel from "./ui/SeasonPanel";

(async () => {
    await DefantasyContract.loadConstants();

    el(".game-container",
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
    ).appendTo(BodyNode);
})();