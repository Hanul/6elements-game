import { ClosableFloatingDomNode, Position } from "@hanul/skynode";

export default class CreateArmy extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, document.createElement("div"));
    }
}
