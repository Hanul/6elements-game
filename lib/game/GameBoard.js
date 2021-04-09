"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class GameBoard extends skynode_1.DomNode {
    constructor() {
        super(document.createElement("div"));
        this.appendText("Game Board");
    }
}
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map