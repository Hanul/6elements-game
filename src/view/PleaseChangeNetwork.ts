import { BodyNode, DomNode, el } from "@hanul/skynode";
import Wallet from "../ethereum/Wallet";

export default class PleaseChangeNetwork extends DomNode {

    constructor() {
        super("#help");
        this.append(
            el("p", "Please Change Network to Polygon."),
            el("a", "Change Network", {
                click: async () => {
                    await Wallet.changeNetwork(
                        137,
                        "Polygon",
                        {
                            name: "Matic",
                            symbol: "MATIC",
                            decimals: 18,
                        },
                        "https://matic-mainnet.chainstacklabs.com/",
                        "https://polygonscan.com/",
                    );
                    location.reload();
                },
            }),
        );
        this.appendTo(BodyNode);
    }
}
