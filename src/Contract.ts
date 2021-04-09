import { ethers } from "ethers";
import ContractABI from "./ContractABI";

class Contract {

    private provider = new ethers.providers.Web3Provider((window as any).ethereum)
    private signer = this.provider.getSigner();
    private abi = ContractABI;
    private contract = new ethers.Contract("0x533CF0eB4C5Dbfb189e8030E65032d8270B09CBE", this.abi, this.provider);

    public async test() {
        console.log((await this.contract.rewards(0)).toString());
    }
}

export default new Contract();
