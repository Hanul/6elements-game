import { BodyNode, DomNode, el } from "@hanul/skynode";
import Wallet from "../ethereum/Wallet";

export default class PleaseConnect extends DomNode {

    constructor() {
        super("#help");
        this.append(
            el("p", "Please Connect"),
            el("a", "Connect", {
                click: async () => {
                    await Wallet.connect();
                    location.reload();
                },
            }),
        );
        this.appendTo(BodyNode);
    }
}
