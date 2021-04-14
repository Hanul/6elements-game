import { BodyNode, ClosableFloatingDomNode, DomNode, el } from "@hanul/skynode";
import DefantasyContract from "../DefantasyContract";
import CreateArmy from "../ui/CreateArmy";
import Army from "./Army";
import GameBoard from "./GameBoard";

class CellMenu extends ClosableFloatingDomNode {
    constructor(x: number, y: number) {
        super({ left: -999999, top: 999999 }, ".cell-menu");
        this.append(el("a.menu", "Create", {
            click: () => {
                new CreateArmy(x, y);
                this.delete();
            },
        }));
    }
}

export default class Cell extends DomNode {

    public army: Army | undefined;

    constructor(private gameBoard: GameBoard, private x: number, private y: number) {
        super("a.cell");

        this.on("click", async () => {
            if (this.army === undefined) {
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
        const armyData = await DefantasyContract.getArmy(this.x, this.y);
        if (armyData !== undefined) {
            this.army = new Army(this.gameBoard, armyData).appendTo(this);
        }
    }
}
