import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { SixElements } from "../SixElements";
export declare class SixElements__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_devSupporter: string, overrides?: Overrides): Promise<SixElements>;
    getDeployTransaction(_devSupporter: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): SixElements;
    connect(signer: Signer): SixElements__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SixElements;
}
//# sourceMappingURL=SixElements__factory.d.ts.map