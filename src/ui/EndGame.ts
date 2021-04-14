import { BigNumber } from "@ethersproject/bignumber";
import { el, Popup } from "@hanul/skynode";

export default class EndGame extends Popup {

    constructor(season: BigNumber, winner: string) {
        super(".popup");
        this.append(el(".content.end-game",
            el("p", `Season ${season.toString()} Ended! Winner: ${winner}`),
            el("a.confirm", "OK", { click: () => location.reload() }),
        ));
    }
}
