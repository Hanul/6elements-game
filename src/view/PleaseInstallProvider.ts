import { BodyNode, DomNode, el } from "@hanul/skynode";

export default class PleaseInstallProvider extends DomNode {

    constructor() {
        super(".please-install-provider");
        this.append(
            el("p", "Please Install Provider"),
            el("a", "Reload", { click: () => location.reload() }),
        );
        this.appendTo(BodyNode);
    }
}
