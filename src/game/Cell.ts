import { ClosableFloatingDomNode, DomNode, el } from "@hanul/skynode";
import SixElementsContract from "../contracts/SixElementsContract";
import Wallet from "../ethereum/Wallet";
import CreateArmyPopup from "../ui/CreateArmyPopup";
import Army from "./Army";
import GameBoard from "./GameBoard";

class CellMenu extends ClosableFloatingDomNode {
    constructor(x: number, y: number) {
        super({ left: -999999, top: 999999 }, ".cell-menu");
        this.append(el("a.menu", "Create", {
            click: () => {
                new CreateArmyPopup(x, y);
                this.delete();
            },
        }));
    }
}

export default class Cell extends DomNode {

    public army: Army | undefined;

    constructor(private gameBoard: GameBoard, public x: number, public y: number) {
        super("a.cell");

        this.onDom("click", async () => {
            const address = await Wallet.loadAddress();
            if (this.army === undefined && address !== undefined && gameBoard.checkAllies(address, x, y)) {
                const menu = new CellMenu(this.x, this.y).appendTo(gameBoard);
                const rect = this.rect;
                menu.style({
                    left: rect.left + window.scrollX + (rect.width - menu.rect.width) / 2,
                    top: rect.top + window.scrollY - menu.rect.height - 10,
                });
            }
        });

        this.loadArmy();
    }

    public async loadArmy() {
        const armyData = await SixElementsContract.getArmy(this.x, this.y);
        this.army?.delete();
        this.army = undefined;
        if (armyData !== undefined) {
            this.army = new Army(this.gameBoard, this.x, this.y, armyData).appendTo(this);
        }
    }
}
