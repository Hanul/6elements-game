import { ClosableFloatingDomNode, DomNode, el, Position } from "@hanul/skynode";
import ArmyColors from "./ArmyColors";
import ArmyData, { ArmyKind } from "./ArmyData";
import GameBoard from "./GameBoard";

class ArmyMenu extends ClosableFloatingDomNode {
    constructor() {
        super({ left: -999999, top: 999999 }, ".army-menu");
        this.append(el(".menu", "Append"));
        this.append(el(".menu", "Attack"));
    }
}

export default class Army extends DomNode {

    private static addressToColors: { [address: string]: string } = {};

    constructor(gameBoard: GameBoard, armyData: ArmyData) {
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

        this.on("click", async () => {
            const menu = new ArmyMenu().appendTo(this);
            const rect = this.rect;
            menu.style({
                left: rect.left + window.scrollX + (rect.width - menu.rect.width) / 2,
                top: rect.top + window.scrollY - menu.rect.height - 10,
            });
        });
    }
}
