import { DomNode } from "@hanul/skynode";
import Cell from "./Cell";
export default class GameBoard extends DomNode {
    private mapWidth;
    private mapHeight;
    cells: {
        [position: string]: Cell;
    };
    checkAllies(address: string, x: number, y: number): boolean;
    constructor();
    private load;
    private joinGameHandler;
    private createArmyHandler;
    private appendUnitsHandler;
    private attackHandler;
    delete(): void;
}
//# sourceMappingURL=GameBoard.d.ts.map