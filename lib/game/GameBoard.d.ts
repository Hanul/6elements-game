import { DomNode } from "@hanul/skynode";
import Cell from "./Cell";
export default class GameBoard extends DomNode {
    private mapWidth;
    private mapHeight;
    cells: {
        [position: string]: Cell;
    };
    constructor();
    private loadBoard;
}
//# sourceMappingURL=GameBoard.d.ts.map