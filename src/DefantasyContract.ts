import { BigNumber, ethers } from "ethers";
import ArmyData, { ArmyKind } from "./game/ArmyData";

(window as any).ethereum.request({ method: "eth_requestAccounts" });

class DefantasyContract {

    // Binance Testnet
    private static readonly ADDRESS = "0x67b21AE3c8d1d1B86C0290b49d854262AC1D9Eeb";

    // Binance Network
    //private static readonly ADDRESS = "0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE";

    private provider = new ethers.providers.Web3Provider((window as any).ethereum)
    private signer = this.provider.getSigner();
    private abi = require("./DefantasyContractABI.json");
    private contract = new ethers.Contract(DefantasyContract.ADDRESS, this.abi, this.provider).connect(this.signer);

    constructor() {
        this.contract.on("JoinGame", (player, x, y, kind, unitCount) => {
            console.log("JoinGame", player, x, y, kind, unitCount);
        });
        this.contract.on("CreateArmy", (player, x, y, kind, unitCount) => {
            console.log("CreateArmy", player, x, y, kind, unitCount);
        });
    }

    public ENERGY_PRICE!: BigNumber;

    public async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
    }

    public async getMapWidth(): Promise<number> { return await this.contract.mapWidth(); }
    public async getMapHeight(): Promise<number> { return await this.contract.mapHeight(); }
    public async getSeason(): Promise<number> { return await this.contract.season(); }
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
