import { BigNumber, ethers } from "ethers";
import ContractABI from "./ContractABI";
import ArmyData from "./game/ArmyData";

class Contract {

    // Binance Testnet
    private static readonly ADDRESS = "0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE";

    // Binance Network
    //private static readonly ADDRESS = "0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE";

    private provider = new ethers.providers.Web3Provider((window as any).ethereum)
    private signer = this.provider.getSigner();
    private abi = ContractABI;
    private contract = new ethers.Contract(Contract.ADDRESS, this.abi, this.provider);

    public ENERGY_PRICE!: BigNumber;

    public async loadConstants() {
        this.ENERGY_PRICE = await this.contract.ENERGY_PRICE();
    }

    public async getMapWidth(): Promise<number> { return await this.contract.mapWidth(); }
    public async getMapHeight(): Promise<number> { return await this.contract.mapHeight(); }

    public async getArmy(x: number, y: number): Promise<ArmyData | undefined> {
        const armyData = await this.contract.map(x, y);
        if (armyData.owner === ethers.constants.AddressZero) {
            return undefined;
        } else {
            return armyData;
        }
    }

    public async enter() {
        
    }
}

export default new Contract();
