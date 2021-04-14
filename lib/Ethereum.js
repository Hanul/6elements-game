"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
class Ethereum {
    constructor() {
        this.ethereum = window.ethereum;
        if (this.existsProvider === true) {
            this.provider = new ethers_1.ethers.providers.Web3Provider(this.ethereum);
        }
    }
    get existsProvider() { return this.ethereum !== undefined; }
    async getNetwork() {
        return await this.provider.getNetwork();
    }
    async connected() {
        return (await this.provider.listAccounts()).length > 0;
    }
    async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}
exports.default = new Ethereum();
//# sourceMappingURL=Ethereum.js.map