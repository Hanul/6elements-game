import { ClosableFloatingDomNode, DomNode, el } from "@hanul/skynode";
import SixElementsContract from "../contracts/SixElementsContract";
import Wallet from "../ethereum/Wallet";
import AppendUnitsPopup from "../ui/AppendUnitsPopup";
import ArmyColors from "./ArmyColors";
import ArmyData, { ArmyKind } from "./ArmyData";
import GameBoard from "./GameBoard";

class ArmyMenu extends ClosableFloatingDomNode {

    constructor(army: Army, x: number, y: number) {
        super({ left: -999999, top: 999999 }, ".army-menu");

        this.append(el("a.menu", "Add", {
            click: () => {
                new AppendUnitsPopup(x, y);
                this.delete();
            },
        }));

        this.append(el("a.menu", "Attack", {
            click: () => {
                army.showAttackArrows();
                this.delete();
            },
        }));
    }
}

class Arrow extends DomNode {

    constructor(private army: Army, direction: string, private toX: number, private toY: number) {
        super(`a.arrow.${direction}`);
        this.append(el("img", { src: "/images/arrow.png" }));
        this.onDom("mousedown", (event: MouseEvent) => event.stopPropagation());
        this.onDom("click", (event: MouseEvent) => {
            this.attack();
            event.stopPropagation();
        });
    }

    private async attack() {
        await SixElementsContract.attack(this.army.x, this.army.y, this.toX, this.toY);
        this.army.hideAttackArrows();
    }
}

export default class Army extends DomNode {

    private static addressToColors: { [address: string]: string } = {};

    private arrowContainer: DomNode | undefined;

    constructor(
        gameBoard: GameBoard,
        public x: number,
        public y: number,
        public armyData: ArmyData,
    ) {
        super(".army");

        if (Army.addressToColors[armyData.owner] === undefined) {
            const existsColors = Object.values(Army.addressToColors);
            for (const color of ArmyColors) {
                if (existsColors.includes(color) !== true) {
                    Army.addressToColors[armyData.owner] = color;
                    break;
                }
            }
        }

        this.style({ backgroundColor: Army.addressToColors[armyData.owner] });

        if (armyData.kind === ArmyKind.Light) {
            this.style({ backgroundImage: "url(/images/units/light.png)" });
        } else if (armyData.kind === ArmyKind.Fire) {
            this.style({ backgroundImage: "url(/images/units/fire.png)" });
        } else if (armyData.kind === ArmyKind.Water) {
            this.style({ backgroundImage: "url(/images/units/water.png)" });
        } else if (armyData.kind === ArmyKind.Wind) {
            this.style({ backgroundImage: "url(/images/units/wind.png)" });
        } else if (armyData.kind === ArmyKind.Earth) {
            this.style({ backgroundImage: "url(/images/units/earth.png)" });
        } else if (armyData.kind === ArmyKind.Dark) {
            this.style({ backgroundImage: "url(/images/units/dark.png)" });
        }

        this.append(el("span.unit-count", String(armyData.unitCount)));

        this.onDom("click", async () => {
            if (armyData.owner === await Wallet.loadAddress()) {
                const menu = new ArmyMenu(this, x, y).appendTo(gameBoard);
                const rect = this.rect;
                menu.style({
                    left: rect.left + window.scrollX + (rect.width - menu.rect.width) / 2,
                    top: rect.top + window.scrollY - menu.rect.height - 10,
                });
            }
        });
    }

    private windowMousedownHandler = () => {
        this.hideAttackArrows();
    };

    public hideAttackArrows() {
        this.arrowContainer?.delete();
        this.arrowContainer = undefined;
        window.removeEventListener("mousedown", this.windowMousedownHandler);
    }

    public showAttackArrows() {
        this.hideAttackArrows();
        this.arrowContainer = el(".arrow-container",
            new Arrow(this, "up", this.x, this.y - 1),
            new Arrow(this, "right", this.x + 1, this.y),
            new Arrow(this, "down", this.x, this.y + 1),
            new Arrow(this, "left", this.x - 1, this.y),
        ).appendTo(this);
        window.addEventListener("mousedown", this.windowMousedownHandler);
    }
}
