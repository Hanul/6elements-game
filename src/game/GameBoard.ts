import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import DefantasyContract from "../DefantasyContract";
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

        this.mapWidth = await DefantasyContract.getMapWidth();
        this.mapHeight = await DefantasyContract.getMapHeight();

        this.empty();
        this.style({
            gridTemplateColumns: `repeat(${this.mapHeight}, auto)`,
            gridTemplateRows: `repeat(${this.mapWidth}, auto)`,
        });

        SkyUtil.repeat(this.mapHeight, (y) => {
            SkyUtil.repeat(this.mapWidth, (x) => {
                this.cells[`${x},${y}`] = new Cell(x, y).appendTo(this);
            });
        });
    }
}
