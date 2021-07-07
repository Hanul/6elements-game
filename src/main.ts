import Wallet from "./ethereum/Wallet";
import Game from "./view/Game";
import PleaseChangeNetwork from "./view/PleaseChangeNetwork";
import PleaseConnect from "./view/PleaseConnect";
import PleaseInstallProvider from "./view/PleaseInstallProvider";

(async () => {
    if (Wallet.existsInjectedProvider !== true) {
        new PleaseInstallProvider();
    } else {
        const chainId = await Wallet.loadChainId();
        if (chainId !== 137) {
            new PleaseChangeNetwork();
        } else if (await Wallet.connected() !== true) {
            new PleaseConnect();
        } else {
            new Game();
        }
    }
})();
