import { BodyNode, DomNode, el } from "@hanul/skynode";

export default class PleaseInstallProvider extends DomNode {

    constructor() {
        super("#help");
        this.append(
            el("p", "Please install provider like ", el("a", "MetaMask", { href: "https://metamask.io" }), "."),
            el("a", "Reload", { click: () => location.reload() }),
        );
        this.appendTo(BodyNode);
    }
}
