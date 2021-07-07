import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";

export default class EndGamePopup extends Popup {

    public content: DomNode;

    constructor(season: BigNumber, winner: string) {
        super(".popup");
        this.append(this.content = el(".content.end-game-popup",
            el("h2", "Game Over"),
            el("p", `Season ${season.toString()} Ended! Winner: ${winner}`),
            el("a.confirm", "OK", { click: () => location.reload() }),
        ));
    }
}
