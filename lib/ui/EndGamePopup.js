"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class EndGamePopup extends skynode_1.Popup {
    constructor(season, winner) {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.end-game-popup", skynode_1.el("h2", "Game Over"), skynode_1.el("p", `Season ${season.toString()} Ended! Winner: ${winner}`), skynode_1.el("a.confirm", "OK", { click: () => location.reload() })));
    }
}
exports.default = EndGamePopup;
//# sourceMappingURL=EndGamePopup.js.map