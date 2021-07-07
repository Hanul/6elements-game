import { DomNode } from "@hanul/skynode";
import ArmyData from "./ArmyData";
import GameBoard from "./GameBoard";
export default class Army extends DomNode {
    x: number;
    y: number;
    armyData: ArmyData;
    private static addressToColors;
    private arrowContainer;
    constructor(gameBoard: GameBoard, x: number, y: number, armyData: ArmyData);
    private windowMousedownHandler;
    hideAttackArrows(): void;
    showAttackArrows(): void;
}
//# sourceMappingURL=Army.d.ts.map