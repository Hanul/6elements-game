"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ContractABI_1 = __importDefault(require("./ContractABI"));
window.ethereum.enable();
class Contract {
    constructor() {
        this.provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.abi = ContractABI_1.default;
        this.contract = new ethers_1.ethers.Contract(Contract.ADDRESS, this.abi, this.provider).connect(this.signer);
        this.contract.on("JoinGame", (player, x, y, kind, unitCount) => {
            console.log(player, x, y, kind, unitCount);
        });
    }
    async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
    }
    async getMapWidth() { return await this.contract.mapWidth(); }
    async getMapHeight() { return await this.contract.mapHeight(); }
    async getArmy(x, y) {
        const armyData = await this.contract.map(x, y);
        if (armyData.owner === ethers_1.ethers.constants.AddressZero) {
            return undefined;
        }
        else {
            return armyData;
        }
    }
    async buyEnergy(energy) {
        await this.contract.buyEnergy({ value: this.ENERGY_PRICE.mul(energy) });
    }
    async joinGame(x, y, kind, unitCount) {
        await this.contract.joinGame(x, y, kind, unitCount);
    }
}
Contract.ADDRESS = "0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE";
exports.default = new Contract();
//# sourceMappingURL=Contract.js.map