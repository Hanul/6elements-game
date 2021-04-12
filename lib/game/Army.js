"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArmyData_1 = require("./ArmyData");
class Army extends skynode_1.DomNode {
    constructor(armyData) {
        super(".army");
        if (armyData.kind === ArmyData_1.ArmyKind.Light) {
            this.style({ backgroundImage: "url(/images/units/light.png)" });
        }
        else if (armyData.kind === ArmyData_1.ArmyKind.Fire) {
            this.style({ backgroundImage: "url(/images/units/fire.png)" });
        }
        else if (armyData.kind === ArmyData_1.ArmyKind.Water) {
            this.style({ backgroundImage: "url(/images/units/water.png)" });
        }
        else if (armyData.kind === ArmyData_1.ArmyKind.Wind) {
            this.style({ backgroundImage: "url(/images/units/wind.png)" });
        }
        else if (armyData.kind === ArmyData_1.ArmyKind.Earth) {
            this.style({ backgroundImage: "url(/images/units/earth.png)" });
        }
        else if (armyData.kind === ArmyData_1.ArmyKind.Dark) {
            this.style({ backgroundImage: "url(/images/units/dark.png)" });
        }
        this.append(skynode_1.el("span.unit-count", String(armyData.unitCount)));
    }
}
exports.default = Army;
//# sourceMappingURL=Army.js.map