"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const NetworkProvider_1 = __importDefault(require("../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const SixElements_json_1 = __importDefault(require("./artifacts/contracts/SixElements.sol/SixElements.json"));
const Contract_1 = __importDefault(require("./Contract"));
class SixElementContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.SixElements, SixElements_json_1.default.abi, [
            "BuyEnergy",
            "UseEnergy",
            "JoinGame",
            "CreateArmy",
            "AppendUnits",
            "Attack",
            "Support",
            "EndSeason",
        ]);
        this.loadConstants();
    }
    async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
        this.BASE_SUMMON_ENERGY = await this.contract.BASE_SUMMON_ENERGY();
    }
    async getMapWidth() { return await this.contract.mapWidth(); }
    async getMapHeight() { return await this.contract.mapHeight(); }
    async getSeason() { return await this.contract.season(); }
    async getUnitEnergy() {
        const season = await this.contract.season();
        return season.add(this.BASE_SUMMON_ENERGY);
    }
    async getReward(season) {
        return await this.contract.rewards(season);
    }
    async getEnergy(address) {
        return await this.contract.energies(address);
    }
    async getArmy(x, y) {
        const armyData = await this.contract.map(y, x);
        if (armyData.owner === ethers_1.constants.AddressZero) {
            return undefined;
        }
        else {
            return armyData;
        }
    }
    async checkBalance(address, value) {
        const balance = await NetworkProvider_1.default.getBalance(address);
        if (balance.lt(value) === true) {
            alert("Not Enough MATIC.");
            return false;
        }
        return true;
    }
    async buyEnergy(energy) {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const value = this.ENERGY_PRICE.mul(energy);
            if (await this.checkBalance(address, value) === true) {
                const contract = await this.loadWalletContract();
                await (contract === null || contract === void 0 ? void 0 : contract.buyEnergy({ value }));
            }
        }
    }
    async createArmy(x, y, kind, unitCount) {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
            const playerEnergy = await this.getEnergy(address);
            const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;
            const value = this.ENERGY_PRICE.mul(energy);
            if (await this.checkBalance(address, value) === true) {
                const contract = await this.loadWalletContract();
                await (contract === null || contract === void 0 ? void 0 : contract.createArmy(x, y, kind, unitCount, { value }));
            }
        }
    }
    async appendUnits(x, y, unitCount) {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
            const playerEnergy = await this.getEnergy(address);
            const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;
            const value = this.ENERGY_PRICE.mul(energy);
            if (await this.checkBalance(address, value) === true) {
                const contract = await this.loadWalletContract();
                await (contract === null || contract === void 0 ? void 0 : contract.appendUnits(x, y, unitCount, { value }));
            }
        }
    }
    async attack(fromX, fromY, toX, toY) {
        const contract = await this.loadWalletContract();
        await (contract === null || contract === void 0 ? void 0 : contract.attack(fromX, fromY, toX, toY));
    }
}
exports.default = new SixElementContract();
//# sourceMappingURL=SixElementsContract.js.map