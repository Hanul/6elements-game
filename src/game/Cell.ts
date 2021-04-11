import { DomNode } from "@hanul/skynode";
import Contract from "../Contract";
import { ArmyKind } from "./ArmyData";

export default class Cell extends DomNode {

    constructor(x: number, y: number) {
        super("a.cell");

        this.on("click", async () => {
            await Contract.joinGame(x, y, ArmyKind.Fire, 1);
        });
    }
}
