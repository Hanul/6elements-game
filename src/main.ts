import { BodyNode, el } from "@hanul/skynode";
import Contract from "./Contract";
import GameBoard from "./game/GameBoard";
import RewardPanel from "./ui/RewardPanel";

(async () => {
    await Contract.loadConstants();

    el("div",
        {
            style: {
                width: 534,
            },
        },
        el("h1", "Defantasy"),
        el("p.game-description", "This is defantasy game."),
        new RewardPanel(),
        el(".game-board-container",
            new GameBoard(),
        ),
        el(".button-container",
            el("a.button", "Be Summoner", {
                click: () => { },
            }),
            el("a.button", "Be Supporter", {
                click: () => { },
            }),
        ),
    ).appendTo(BodyNode);
})();