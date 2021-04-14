"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ethereum_1 = __importDefault(require("./Ethereum"));
const Game_1 = __importDefault(require("./view/Game"));
const PleaseChangeNetwork_1 = __importDefault(require("./view/PleaseChangeNetwork"));
const PleaseConnect_1 = __importDefault(require("./view/PleaseConnect"));
const PleaseInstallProvider_1 = __importDefault(require("./view/PleaseInstallProvider"));
(async () => {
    if (Ethereum_1.default.existsProvider !== true) {
        new PleaseInstallProvider_1.default();
    }
    else {
        const network = await Ethereum_1.default.getNetwork();
        if (network.chainId !== 97) {
            new PleaseChangeNetwork_1.default();
        }
        else if (await Ethereum_1.default.connected() !== true) {
            new PleaseConnect_1.default();
        }
        else {
            new Game_1.default();
        }
    }
})();
//# sourceMappingURL=main.js.map