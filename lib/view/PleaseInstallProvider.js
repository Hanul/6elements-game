"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PleaseInstallProvider extends skynode_1.DomNode {
    constructor() {
        super("#help");
        this.append(skynode_1.el("p", "Please install provider like ", skynode_1.el("a", "MetaMask", { href: "https://metamask.io" }), "."), skynode_1.el("a", "Reload", { click: () => location.reload() }));
        this.appendTo(skynode_1.BodyNode);
    }
}
exports.default = PleaseInstallProvider;
//# sourceMappingURL=PleaseInstallProvider.js.map