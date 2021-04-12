"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class AppendUnits extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(skynode_1.el(".content.append-units"));
    }
}
exports.default = AppendUnits;
//# sourceMappingURL=AppendUnits.js.map