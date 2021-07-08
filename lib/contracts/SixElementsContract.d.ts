import { BigNumber } from "ethers";
import ArmyData, { ArmyKind } from "../game/ArmyData";
import Contract from "./Contract";
import { SixElements } from "./typechain";
declare class SixElementContract extends Contract<SixElements> {
    constructor();
    ENERGY_PRICE: BigNumber;
    BASE_SUMMON_ENERGY: number;
    loadConstants(): Promise<void>;
    getMapWidth(): Promise<number>;
    getMapHeight(): Promise<number>;
    getSeason(): Promise<BigNumber>;
    getUnitEnergy(): Promise<BigNumber>;
    getReward(season: number): Promise<BigNumber>;
    getEnergy(address: string): Promise<BigNumber>;
    getArmy(x: number, y: number): Promise<ArmyData | undefined>;
    private checkBalance;
    buyEnergy(energy: number): Promise<void>;
    createArmy(x: number, y: number, kind: ArmyKind, unitCount: number): Promise<void>;
    appendUnits(x: number, y: number, unitCount: number): Promise<void>;
    attack(fromX: number, fromY: number, toX: number, toY: number): Promise<void>;
}
declare const _default: SixElementContract;
export default _default;
//# sourceMappingURL=SixElementsContract.d.ts.map