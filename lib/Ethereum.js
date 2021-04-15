"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const DefantasyContract_1 = __importDefault(require("./DefantasyContract"));
class Ethereum {
    constructor() {
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
        this.ethereum = window.ethereum;
        if (this.existsWeb3Provider === true) {
            this.web3Provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
        }
    }
    get existsWeb3Provider() { return this.ethereum !== undefined; }
    async getNetwork() {
        return await this.provider.getNetwork();
    }
    async connected() {
        this.playerAddress = (await this.web3Provider.listAccounts())[0];
        DefantasyContract_1.default.init();
        return this.playerAddress !== undefined;
    }
    async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}
exports.default = new Ethereum();
//# sourceMappingURL=Ethereum.js.map