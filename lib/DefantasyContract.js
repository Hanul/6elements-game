"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const Ethereum_1 = __importDefault(require("./Ethereum"));
class DefantasyContract extends eventcontainer_1.default {
    async init() {
        this.signer = Ethereum_1.default.provider.getSigner(Ethereum_1.default.playerAddress);
        this.web3Signer = Ethereum_1.default.web3Provider.getSigner();
        this.contract = new ethers_1.ethers.Contract(DefantasyContract.ADDRESS, DefantasyContract.ABI, Ethereum_1.default.provider).connect(this.signer);
        this.web3Contract = new ethers_1.ethers.Contract(DefantasyContract.ADDRESS, DefantasyContract.ABI, Ethereum_1.default.web3Provider).connect(this.web3Signer);
        this.contract.on("BuyEnergy", (player, quantity) => {
            this.fireEvent("BuyEnergy", player, quantity);
        });
        this.contract.on("UseEnergy", (player, quantity) => {
            this.fireEvent("UseEnergy", player, quantity);
        });
        this.contract.on("JoinGame", (player, x, y, kind, unitCount) => {
            this.fireEvent("JoinGame", player, x, y, kind, unitCount);
        });
        this.contract.on("CreateArmy", (player, x, y, kind, unitCount) => {
            this.fireEvent("CreateArmy", player, x, y, kind, unitCount);
        });
        this.contract.on("AppendUnits", (player, x, y, unitCount) => {
            this.fireEvent("AppendUnits", player, x, y, unitCount);
        });
        this.contract.on("Attack", (player, fromX, fromY, toX, toY) => {
            this.fireEvent("Attack", player, fromX, fromY, toX, toY);
        });
        this.contract.on("Support", (supporter, to, quantity) => {
            this.fireEvent("Support", supporter, to, quantity);
        });
        this.contract.on("EndSeason", (season, winner) => {
            this.fireEvent("EndSeason", season, winner);
        });
    }
    async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
        this.BASE_SUMMON_ENERGY = await this.contract.BASE_SUMMON_ENERGY();
    }
    async getMapWidth() { return await this.contract.mapWidth(); }
    async getMapHeight() { return await this.contract.mapHeight(); }
    async getSeason() { return await this.contract.season(); }
    async getUnitEnergy() { return this.BASE_SUMMON_ENERGY + await this.contract.season(); }
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
        await this.web3Contract.buyEnergy({ value: this.ENERGY_PRICE.mul(energy) });
    }
    async createArmy(x, y, kind, unitCount) {
        const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
        const playerEnergy = await this.getEnergy(await this.getPlayerAddress());
        const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;
        await this.web3Contract.createArmy(x, y, kind, unitCount, { value: this.ENERGY_PRICE.mul(energy) });
    }
    async appendUnits(x, y, unitCount) {
        const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
        const playerEnergy = await this.getEnergy(await this.getPlayerAddress());
        const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;
        await this.web3Contract.appendUnits(x, y, unitCount, { value: this.ENERGY_PRICE.mul(energy) });
    }
    async attack(fromX, fromY, toX, toY) {
        await this.web3Contract.attack(fromX, fromY, toX, toY);
    }
}
DefantasyContract.ADDRESS = "0x040fC1243439ab8927cc58c23D95b6F0b46D5974";
DefantasyContract.ABI = require("./DefantasyContractABI.json");
exports.default = new DefantasyContract();
//# sourceMappingURL=DefantasyContract.js.map