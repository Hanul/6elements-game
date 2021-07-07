"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class AttackConfirm extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.attack-confirm"));
    }
}
exports.default = AttackConfirm;
//# sourceMappingURL=AttackConfirm.js.map