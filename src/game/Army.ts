import { DomNode, el } from "@hanul/skynode";
import ArmyData, { ArmyKind } from "./ArmyData";

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
    }
}
