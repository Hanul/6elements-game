import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import Contract from "../Contract";
import Army from "./Army";
import Cell from "./Cell";

export default class GameBoard extends DomNode {

    private mapWidth = 0;
    private mapHeight = 0;
    private cells: { [position: string]: Cell } = {};
    private armies: { [position: string]: Army } = {};

    constructor() {
        super(".gameboard");
        this.loadBoard();
    }

    private async loadBoard() {

        this.mapWidth = await Contract.getMapWidth();
        this.mapHeight = await Contract.getMapHeight();

        this.empty();
        this.style({
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });

        await SkyUtil.repeat(this.mapHeight, async (y) => {
            await SkyUtil.repeat(this.mapWidth, async (x) => {
                this.cells[`${x},${y}`] = new Cell(x, y).appendTo(this);
                const armyData = await Contract.getArmy(x, y);
                console.log(armyData);
            });
        });
    }
}
