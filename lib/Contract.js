"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ContractABI_1 = __importDefault(require("./ContractABI"));
class Contract {
    constructor() {
        this.provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.abi = ContractABI_1.default;
        this.contract = new ethers_1.ethers.Contract("0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE", this.abi, this.provider);
    }
    async test() {
        console.log((await this.contract.rewards(0)).toString());
    }
}
exports.default = new Contract();
//# sourceMappingURL=Contract.js.map