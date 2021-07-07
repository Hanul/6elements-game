"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Game extends skynode_1.DomNode {
    constructor() {
        super("#game");
        this.append(skynode_1.el("h1", "6 Elements"));
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map