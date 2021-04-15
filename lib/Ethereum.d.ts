import { ethers } from "ethers";
declare class Ethereum {
    provider: ethers.providers.JsonRpcProvider;
    private ethereum;
    get existsWeb3Provider(): boolean;
    web3Provider: ethers.providers.Web3Provider;
    playerAddress: string;
    constructor();
    getNetwork(): Promise<ethers.providers.Network>;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
}
declare const _default: Ethereum;
export default _default;
//# sourceMappingURL=Ethereum.d.ts.map