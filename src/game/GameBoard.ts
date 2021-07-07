import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import SixElementsContract from "../contracts/SixElementsContract";
import { ArmyKind } from "./ArmyData";
import Cell from "./Cell";

export default class GameBoard extends DomNode {

    private mapWidth = 0;
    private mapHeight = 0;
    public cells: { [position: string]: Cell } = {};

    public checkAllies(address: string, x: number, y: number) {
        let count = 0;
        for (const cell of Object.values(this.cells)) {
            if (cell.army?.armyData.owner === address) {
                count += 1;
                if (Math.abs(cell.x - x) + Math.abs(cell.y - y) <= 1) {
                    return true;
                }
            }
        }
        return count === 0;
    }

    constructor() {
        super(".gameboard");
        this.load();
        SixElementsContract.on("JoinGame", this.joinGameHandler);
        SixElementsContract.on("CreateArmy", this.createArmyHandler);
        SixElementsContract.on("AppendUnits", this.appendUnitsHandler);
        SixElementsContract.on("Attack", this.attackHandler);
    }

    private async load() {

        this.mapWidth = await SixElementsContract.getMapWidth();
        this.mapHeight = await SixElementsContract.getMapHeight();

        this.empty();
        this.style({
            width: this.mapWidth * 44 + 8,
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });

        SkyUtil.repeat(this.mapHeight, (y) => {
            SkyUtil.repeat(this.mapWidth, (x) => {
                this.cells[`${x},${y}`] = new Cell(this, x, y).appendTo(this);
            });
        });
    }

    private joinGameHandler = async (player: string, x: number, y: number, kind: ArmyKind, unitCount: number) => {
        const cell = this.cells[`${x},${y}`];
        cell?.loadArmy();
    };

    private createArmyHandler = async (player: string, x: number, y: number, kind: ArmyKind, unitCount: number) => {
        const cell = this.cells[`${x},${y}`];
        cell?.loadArmy();
    };

    private appendUnitsHandler = async (player: string, x: number, y: number, unitCount: number) => {
        const cell = this.cells[`${x},${y}`];
        cell?.loadArmy();
    };

    private attackHandler = async (player: string, fromX: number, fromY: number, toX: ArmyKind, toY: number) => {
        const fromCell = this.cells[`${fromX},${fromY}`];
        const toCell = this.cells[`${toX},${toY}`];
        fromCell?.loadArmy();
        toCell?.loadArmy();
    };

    public delete() {
        SixElementsContract.off("JoinGame", this.joinGameHandler);
        SixElementsContract.off("CreateArmy", this.createArmyHandler);
        SixElementsContract.off("AppendUnits", this.appendUnitsHandler);
        SixElementsContract.off("Attack", this.attackHandler);
        super.delete();
    }
}
