"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SixElementsContract_1 = __importDefault(require("../contracts/SixElementsContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const AppendUnitsPopup_1 = __importDefault(require("../ui/AppendUnitsPopup"));
const ArmyColors_1 = __importDefault(require("./ArmyColors"));
const ArmyData_1 = require("./ArmyData");
class ArmyMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(army, x, y) {
        super({ left: -999999, top: 999999 }, ".army-menu");
        this.append(skynode_1.el("a.menu", "Add", {
            click: () => {
                new AppendUnitsPopup_1.default(x, y);
                this.delete();
            },
        }));
        this.append(skynode_1.el("a.menu", "Attack", {
            click: () => {
                army.showAttackArrows();
                this.delete();
            },
        }));
    }
}
class Arrow extends skynode_1.DomNode {
    constructor(army, direction, toX, toY) {
        super(`a.arrow.${direction}`);
        this.army = army;
        this.toX = toX;
        this.toY = toY;
        this.append(skynode_1.el("img", { src: "/images/arrow.png" }));
        this.onDom("mousedown", (event) => event.stopPropagation());
        this.onDom("click", (event) => {
            this.attack();
            event.stopPropagation();
        });
    }
    async attack() {
        await SixElementsContract_1.default.attack(this.army.x, this.army.y, this.toX, this.toY);
        this.army.hideAttackArrows();
    }
}
class Army extends skynode_1.DomNode {
    constructor(gameBoard, x, y, armyData) {
        super(".army");
        this.x = x;
        this.y = y;
        this.armyData = armyData;
        this.windowMousedownHandler = () => {
            this.hideAttackArrows();
        };
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
        this.onDom("click", async () => {
            if (armyData.owner === await Wallet_1.default.loadAddress()) {
                const menu = new ArmyMenu(this, x, y).appendTo(gameBoard);
                const rect = this.rect;
                menu.style({
                    left: rect.left + window.scrollX + (rect.width - menu.rect.width) / 2,
                    top: rect.top + window.scrollY - menu.rect.height - 10,
                });
            }
        });
    }
    hideAttackArrows() {
        var _a;
        (_a = this.arrowContainer) === null || _a === void 0 ? void 0 : _a.delete();
        this.arrowContainer = undefined;
        window.removeEventListener("mousedown", this.windowMousedownHandler);
    }
    showAttackArrows() {
        this.hideAttackArrows();
        this.arrowContainer = skynode_1.el(".arrow-container", new Arrow(this, "up", this.x, this.y - 1), new Arrow(this, "right", this.x + 1, this.y), new Arrow(this, "down", this.x, this.y + 1), new Arrow(this, "left", this.x - 1, this.y)).appendTo(this);
        window.addEventListener("mousedown", this.windowMousedownHandler);
    }
}
exports.default = Army;
Army.addressToColors = {};
//# sourceMappingURL=Army.js.map