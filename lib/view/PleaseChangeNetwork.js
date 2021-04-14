"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class PleaseChangeNetwork extends skynode_1.DomNode {
    constructor() {
        super(".please-change-network");
        this.append(skynode_1.el("p", "Please Change Network to Binance Testnet"), skynode_1.el("a", "Reload", { click: () => location.reload() }));
        this.appendTo(skynode_1.BodyNode);
    }
}
exports.default = PleaseChangeNetwork;
//# sourceMappingURL=PleaseChangeNetwork.js.map