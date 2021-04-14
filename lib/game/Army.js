"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ArmyColors_1 = __importDefault(require("./ArmyColors"));
const ArmyData_1 = require("./ArmyData");
class ArmyMenu extends skynode_1.ClosableFloatingDomNode {
    constructor() {
        super({ left: -999999, top: 999999 }, ".army-menu");
        this.append(skynode_1.el(".menu", "Append"));
        this.append(skynode_1.el(".menu", "Attack"));
    }
}
class Army extends skynode_1.DomNode {
    constructor(gameBoard, armyData) {
        super(".army");
        if (Army.addressToColors[armyData.owner] === undefined) {
            const existsColors = Object.values(Army.addressToColors);
            for (const color of ArmyColors_1.default) {
                if (existsColors.includes(color) !== true) {
                    Army.addressToColors[armyData.owner] = color;
                    break;
                }
            }
        }
        this.style({ backgroundColor: Army.addressToColors[armyData.owner] });
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
exports.default = Army;
Army.addressToColors = {};
//# sourceMappingURL=Army.js.map