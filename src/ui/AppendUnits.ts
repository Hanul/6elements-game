import { ClosableFloatingDomNode, Position } from "@hanul/skynode";

export default class AppendUnits extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, document.createElement("div"));
    }
}
