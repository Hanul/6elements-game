import Ethereum from "./Ethereum";
import Game from "./view/Game";
import PleaseChangeNetwork from "./view/PleaseChangeNetwork";
import PleaseConnect from "./view/PleaseConnect";
import PleaseInstallProvider from "./view/PleaseInstallProvider";

(async () => {
    if (Ethereum.existsWeb3Provider !== true) {
        new PleaseInstallProvider();
    } else {
        const network = await Ethereum.getNetwork();
        if (/*network.chainId !== 56 && */network.chainId !== 97) {
            new PleaseChangeNetwork();
        } else if (await Ethereum.connected() !== true) {
            new PleaseConnect();
        } else {
            new Game();
        }
    }
})();