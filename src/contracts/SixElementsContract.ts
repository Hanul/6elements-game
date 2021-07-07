import { BigNumber, constants } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import ArmyData, { ArmyKind } from "../game/ArmyData";
import SixElementsArtifact from "./artifacts/contracts/SixElements.sol/SixElements.json";
import Contract from "./Contract";
import { SixElements } from "./typechain";

class SixElementContract extends Contract<SixElements> {

    constructor() {
        super(Config.contracts.SixElements, SixElementsArtifact.abi, [
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

    public ENERGY_PRICE!: BigNumber;
    public BASE_SUMMON_ENERGY!: number;

    public async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
        this.BASE_SUMMON_ENERGY = await this.contract.BASE_SUMMON_ENERGY();
    }

    public async getMapWidth(): Promise<number> { return await this.contract.mapWidth(); }
    public async getMapHeight(): Promise<number> { return await this.contract.mapHeight(); }
    public async getSeason(): Promise<BigNumber> { return await this.contract.season(); }

    public async getUnitEnergy(): Promise<BigNumber> {
        const season = await this.contract.season();
        return season.add(this.BASE_SUMMON_ENERGY);
    }

    public async getReward(season: number): Promise<BigNumber> {
        return await this.contract.rewards(season);
    }

    public async getEnergy(address: string): Promise<BigNumber> {
        return await this.contract.energies(address);
    }

    public async getArmy(x: number, y: number): Promise<ArmyData | undefined> {
        const armyData = await this.contract.map(y, x);
        if (armyData.owner === constants.AddressZero) {
            return undefined;
        } else {
            return armyData;
        }
    }

    public async buyEnergy(energy: number): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.buyEnergy({ value: this.ENERGY_PRICE.mul(energy) });
    }

    public async createArmy(
        x: number,
        y: number,
        kind: ArmyKind,
        unitCount: number,
    ): Promise<void> {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
            const playerEnergy = await this.getEnergy(address);
            const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;

            const contract = await this.loadWalletContract();
            await contract?.createArmy(x, y, kind, unitCount, { value: this.ENERGY_PRICE.mul(energy) });
        }
    }

    public async appendUnits(
        x: number,
        y: number,
        unitCount: number,
    ): Promise<void> {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const energyNeed = (await this.getUnitEnergy()).mul(unitCount);
            const playerEnergy = await this.getEnergy(address);
            const energy = energyNeed.gt(playerEnergy) ? energyNeed.sub(playerEnergy) : 0;

            const contract = await this.loadWalletContract();
            await contract?.appendUnits(x, y, unitCount, { value: this.ENERGY_PRICE.mul(energy) });
        }
    }

    public async attack(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
    ): Promise<void> {
        const contract = await this.loadWalletContract();
        await contract?.attack(fromX, fromY, toX, toY);
    }
}

export default new SixElementContract();
