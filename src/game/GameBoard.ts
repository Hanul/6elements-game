import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import DefantasyContract from "../DefantasyContract";
import { ArmyKind } from "./ArmyData";
import Cell from "./Cell";

export default class GameBoard extends DomNode {

    private mapWidth = 0;
    private mapHeight = 0;
    public cells: { [position: string]: Cell } = {};

    constructor() {
        super(".gameboard");
        this.loadBoard();
        DefantasyContract.on("JoinGame", this.joinGameHandler);
        DefantasyContract.on("CreateArmy", this.createArmyHandler);
        DefantasyContract.on("AppendUnits", this.appendUnitsHandler);
        DefantasyContract.on("Attack", this.attackHandler);
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

    private async loadBoard() {

        this.mapWidth = await DefantasyContract.getMapWidth();
        this.mapHeight = await DefantasyContract.getMapHeight();

        this.empty();
        this.style({
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });

        SkyUtil.repeat(this.mapHeight, (y) => {
            SkyUtil.repeat(this.mapWidth, (x) => {
                this.cells[`${x},${y}`] = new Cell(this, x, y).appendTo(this);
            });
        });
    }

    public delete() {
        DefantasyContract.off("JoinGame", this.joinGameHandler);
        DefantasyContract.off("CreateArmy", this.createArmyHandler);
        DefantasyContract.off("AppendUnits", this.appendUnitsHandler);
        DefantasyContract.off("Attack", this.attackHandler);
        super.delete();
    }
}
