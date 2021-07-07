"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wallet_1 = __importDefault(require("./ethereum/Wallet"));
const Game_1 = __importDefault(require("./view/Game"));
const PleaseChangeNetwork_1 = __importDefault(require("./view/PleaseChangeNetwork"));
const PleaseConnect_1 = __importDefault(require("./view/PleaseConnect"));
const PleaseInstallProvider_1 = __importDefault(require("./view/PleaseInstallProvider"));
(async () => {
    if (Wallet_1.default.existsInjectedProvider !== true) {
        new PleaseInstallProvider_1.default();
    }
    else {
        const chainId = await Wallet_1.default.loadChainId();
        if (chainId !== 137) {
            new PleaseChangeNetwork_1.default();
        }
        else if (await Wallet_1.default.connected() !== true) {
            new PleaseConnect_1.default();
        }
        else {
            new Game_1.default();
        }
    }
})();
//# sourceMappingURL=main.js.map