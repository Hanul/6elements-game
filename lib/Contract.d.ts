import { BigNumber } from "ethers";
import ArmyData, { ArmyKind } from "./game/ArmyData";
declare class DefantasyContract {
    private static readonly ADDRESS;
    private provider;
    private signer;
    private abi;
    private contract;
    constructor();
    ENERGY_PRICE: BigNumber;
    loadConstants(): Promise<void>;
    getMapWidth(): Promise<number>;
    getMapHeight(): Promise<number>;
    getSeason(): Promise<number>;
    getArmy(x: number, y: number): Promise<ArmyData | undefined>;
    buyEnergy(energy: number): Promise<void>;
    createArmy(x: number, y: number, kind: ArmyKind, unitCount: number): Promise<void>;
}
declare const _default: DefantasyContract;
export default _default;
//# sourceMappingURL=Contract.d.ts.map