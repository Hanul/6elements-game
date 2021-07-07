"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class EndGame extends skynode_1.Popup {
    constructor(season, winner) {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.end-game", skynode_1.el("p", `Season ${season.toString()} Ended! Winner: ${winner}`), skynode_1.el("a.confirm", "OK", { click: () => location.reload() })));
    }
}
exports.default = EndGame;
//# sourceMappingURL=EndGame.js.map