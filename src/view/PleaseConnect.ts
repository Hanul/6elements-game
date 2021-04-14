import { BodyNode, DomNode, el } from "@hanul/skynode";
import Ethereum from "../Ethereum";

export default class PleaseConnect extends DomNode {

    constructor() {
        super(".please-connect");
        this.append(
            el("p", "Please Connect"),
            el("a", "Connect", {
                click: async () => {
                    await Ethereum.connect();
                    location.reload();
                },
            }),
        );
        this.appendTo(BodyNode);
    }
}
