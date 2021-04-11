import { BigNumber } from "ethers";
import ArmyData from "./game/ArmyData";
declare class Contract {
    private static readonly ADDRESS;
    private provider;
    private signer;
    private abi;
    private contract;
    ENERGY_PRICE: BigNumber;
    loadConstants(): Promise<void>;
    getMapWidth(): Promise<number>;
    getMapHeight(): Promise<number>;
    getArmy(x: number, y: number): Promise<ArmyData | undefined>;
    enter(): Promise<void>;
}
declare const _default: Contract;
export default _default;
//# sourceMappingURL=Contract.d.ts.map