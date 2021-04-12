"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
window.ethereum.request({ method: "eth_requestAccounts" });
class DefantasyContract {
    constructor() {
        this.provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.abi = require("./DefantasyContractABI.json");
        this.contract = new ethers_1.ethers.Contract(DefantasyContract.ADDRESS, this.abi, this.provider).connect(this.signer);
        this.contract.on("JoinGame", (player, x, y, kind, unitCount) => {
            console.log("JoinGame", player, x, y, kind, unitCount);
        });
        this.contract.on("CreateArmy", (player, x, y, kind, unitCount) => {
            console.log("CreateArmy", player, x, y, kind, unitCount);
        });
    }
    async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
    }
    async getMapWidth() { return await this.contract.mapWidth(); }
    async getMapHeight() { return await this.contract.mapHeight(); }
    async getSeason() { return await this.contract.season(); }
    async getPlayerAddress() { return await this.signer.getAddress(); }
    async getReward(season) {
        return await this.contract.rewards(season);
    }
    async getEnergy(address) {
        return await this.contract.energies(address);
    }
    async getArmy(x, y) {
        const armyData = await this.contract.map(y, x);
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
    async createArmy(x, y, kind, unitCount) {
        await this.contract.createArmy(x, y, kind, unitCount);
    }
}
DefantasyContract.ADDRESS = "0x67b21AE3c8d1d1B86C0290b49d854262AC1D9Eeb";
exports.default = new DefantasyContract();
//# sourceMappingURL=DefantasyContract.js.map