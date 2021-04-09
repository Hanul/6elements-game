import { DomNode } from "@hanul/skynode";

export default class GameBoard extends DomNode {

    constructor() {
        super(document.createElement("div"));
        this.appendText("Game Board");
    }
}
