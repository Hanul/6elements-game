"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class AttackConfirmPopup extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(this.content = skynode_1.el(".content.attack-confirm-popup"));
    }
}
exports.default = AttackConfirmPopup;
//# sourceMappingURL=AttackConfirmPopup.js.map