import { ethers } from "ethers";
declare class Ethereum {
    private ethereum;
    get existsProvider(): boolean;
    provider: ethers.providers.Web3Provider;
    constructor();
    getNetwork(): Promise<ethers.providers.Network>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
}
declare const _default: Ethereum;
export default _default;
//# sourceMappingURL=Ethereum.d.ts.map