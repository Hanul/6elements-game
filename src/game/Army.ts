import { ClosableFloatingDomNode, DomNode, el, Position } from "@hanul/skynode";
import ArmyData, { ArmyKind } from "./ArmyData";

class ArmyMenu extends ClosableFloatingDomNode {
    constructor() {
        super({ left: -999999, top: 999999 }, ".army-menu");
        this.appendText("Army Menu");
    }
}

export default class Army extends DomNode {

    constructor(armyData: ArmyData) {
        super(".army");

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
