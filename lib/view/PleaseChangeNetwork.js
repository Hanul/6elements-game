"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
class PleaseChangeNetwork extends skynode_1.DomNode {
    constructor() {
        super("#help");
        this.append(skynode_1.el("p", "Please Change Network to Polygon."), skynode_1.el("a", "Change Network", {
            click: async () => {
                await Wallet_1.default.changeNetwork(137, "Polygon", {
                    name: "Matic",
                    symbol: "MATIC",
                    decimals: 18,
                }, "https://matic-mainnet.chainstacklabs.com/", "https://polygonscan.com/");
                location.reload();
            },
        }));
        this.appendTo(skynode_1.BodyNode);
    }
}
exports.default = PleaseChangeNetwork;
//# sourceMappingURL=PleaseChangeNetwork.js.map