import { ethers } from "ethers";

class Ethereum {

    private ethereum = (window as any).ethereum;
    public get existsProvider() { return this.ethereum !== undefined; }
    public provider!: ethers.providers.Web3Provider;

    constructor() {
        if (this.existsProvider === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
        }
    }

    public async getNetwork() {
        return await this.provider.getNetwork();
    }

    public async connected() {
        return (await this.provider.listAccounts()).length > 0;
    }

    public async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}

export default new Ethereum();
