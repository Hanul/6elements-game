import { BigNumber, ethers } from "ethers";
import EventContainer from "eventcontainer";
import Ethereum from "./Ethereum";
import ArmyData, { ArmyKind } from "./game/ArmyData";

class DefantasyContract extends EventContainer {

    // Binance Network
    //private static readonly ADDRESS = "0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE";

    // Binance Testnet
    private static readonly ADDRESS = "0xfe6D468bB4DD530E0f5eE98b58e37e11DaAAaF31";

    private static readonly ABI = require("./DefantasyContractABI.json");

    private signer = Ethereum.provider.getSigner();
    private contract = new ethers.Contract(DefantasyContract.ADDRESS, DefantasyContract.ABI, Ethereum.provider).connect(this.signer);

    constructor() {
        super();
        this.contract.on("BuyEnergy", (player, quantity) => {
            this.fireEvent("BuyEnergy", player, quantity);
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

    public ENERGY_PRICE!: BigNumber;

    public async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
    }

    public async getMapWidth(): Promise<number> { return await this.contract.mapWidth(); }
    public async getMapHeight(): Promise<number> { return await this.contract.mapHeight(); }
    public async getSeason(): Promise<number> { return await this.contract.season(); }
    public async getUnitEnergy(): Promise<BigNumber> { return this.ENERGY_PRICE.add(await this.contract.season()); }
    public async getPlayerAddress(): Promise<string> { return await this.signer.getAddress(); }

    public async getReward(season: number): Promise<BigNumber> {
        return await this.contract.rewards(season);
    }

    public async getEnergy(address: string): Promise<BigNumber> {
        return await this.contract.energies(address);
    }

    public async getArmy(x: number, y: number): Promise<ArmyData | undefined> {
        const armyData = await this.contract.map(y, x);
        if (armyData.owner === ethers.constants.AddressZero) {
            return undefined;
        } else {
            return armyData;
        }
    }

    public async buyEnergy(energy: number): Promise<void> {
        await this.contract.buyEnergy({ value: this.ENERGY_PRICE.mul(energy) });
    }

    public async createArmy(
        x: number,
        y: number,
        kind: ArmyKind,
        unitCount: number,
    ): Promise<void> {
        await this.contract.createArmy(x, y, kind, unitCount);
    }
}

export default new DefantasyContract();
