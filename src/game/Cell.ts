import { DomNode } from "@hanul/skynode";
import DefantasyContract from "../DefantasyContract";
import Army from "./Army";
import { ArmyKind } from "./ArmyData";

export default class Cell extends DomNode {

    private army: Army | undefined;

    constructor(private x: number, private y: number) {
        super("a.cell");

        this.on("click", async () => {
            if (this.army === undefined) {
                await DefantasyContract.createArmy(x, y, ArmyKind.Fire, 1);
            }
        });

        this.loadArmy();
    }

    private async loadArmy() {
        const armyData = await DefantasyContract.getArmy(this.x, this.y);
        if (armyData !== undefined) {
            this.army = new Army(armyData).appendTo(this);
        }
    }
}
