"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Ethereum_1 = __importDefault(require("../Ethereum"));
class PleaseConnect extends skynode_1.DomNode {
    constructor() {
        super(".please-connect");
        this.append(skynode_1.el("p", "Please Connect"), skynode_1.el("a", "Connect", {
            click: async () => {
                await Ethereum_1.default.connect();
                location.reload();
            },
        }));
        this.appendTo(skynode_1.BodyNode);
    }
}
exports.default = PleaseConnect;
//# sourceMappingURL=PleaseConnect.js.map