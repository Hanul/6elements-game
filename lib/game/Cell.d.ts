import { DomNode } from "@hanul/skynode";
import Army from "./Army";
import GameBoard from "./GameBoard";
export default class Cell extends DomNode {
    private gameBoard;
    x: number;
    y: number;
    army: Army | undefined;
    constructor(gameBoard: GameBoard, x: number, y: number);
    loadArmy(): Promise<void>;
}
//# sourceMappingURL=Cell.d.ts.map