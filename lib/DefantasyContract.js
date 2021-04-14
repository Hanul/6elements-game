"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const eventcontainer_1 = __importDefault(require("eventcontainer"));
const Ethereum_1 = __importDefault(require("./Ethereum"));
class DefantasyContract extends eventcontainer_1.default {
    constructor() {
        super();
        this.signer = Ethereum_1.default.provider.getSigner();
        this.contract = new ethers_1.ethers.Contract(DefantasyContract.ADDRESS, DefantasyContract.ABI, Ethereum_1.default.provider).connect(this.signer);
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
    }
    async getMapWidth() { return await this.contract.mapWidth(); }
    async getMapHeight() { return await this.contract.mapHeight(); }
    async getSeason() { return await this.contract.season(); }
    async getUnitEnergy() { return this.ENERGY_PRICE.add(await this.contract.season()); }
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
    async appendUnits(x, y, unitCount) {
        await this.contract.appendUnits(x, y, unitCount);
    }
    async attack(fromX, fromY, toX, toY) {
        await this.contract.attack(fromX, fromY, toX, toY);
    }
}
DefantasyContract.ADDRESS = "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31";
DefantasyContract.ABI = require("./DefantasyContractABI.json");
exports.default = new DefantasyContract();
//# sourceMappingURL=DefantasyContract.js.map