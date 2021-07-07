import { BigNumber } from "ethers";
import EventContainer from "eventcontainer";
import ArmyData, { ArmyKind } from "../src/game/ArmyData";
declare class DefantasyContract extends EventContainer {
    private static readonly ADDRESS;
    private static readonly ABI;
    private signer;
    private web3Signer;
    private contract;
    private web3Contract;
    init(): Promise<void>;
    ENERGY_PRICE: BigNumber;
    BASE_SUMMON_ENERGY: number;
    loadConstants(): Promise<void>;
    getMapWidth(): Promise<number>;
    getMapHeight(): Promise<number>;
    getSeason(): Promise<number>;
    getUnitEnergy(): Promise<BigNumber>;
    getPlayerAddress(): Promise<string>;
    getReward(season: number): Promise<BigNumber>;
    getEnergy(address: string): Promise<BigNumber>;
    getArmy(x: number, y: number): Promise<ArmyData | undefined>;
    buyEnergy(energy: number): Promise<void>;
    createArmy(x: number, y: number, kind: ArmyKind, unitCount: number): Promise<void>;
    appendUnits(x: number, y: number, unitCount: number): Promise<void>;
    attack(fromX: number, fromY: number, toX: number, toY: number): Promise<void>;
}
declare const _default: DefantasyContract;
export default _default;
//# sourceMappingURL=DefantasyContract.d.ts.map