import { BodyNode, DomNode, el } from "@hanul/skynode";

export default class PleaseChangeNetwork extends DomNode {

    constructor() {
        super(".please-change-network");
        this.append(
            el("p", "Please Change Network to Binance Testnet"),
            el("a", "Reload", { click: () => location.reload() }),
        );
        this.appendTo(BodyNode);
    }
}
