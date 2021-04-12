"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class CreateArmy extends skynode_1.Popup {
    constructor() {
        super(".popup");
        this.append(skynode_1.el(".content.create-army"));
    }
}
exports.default = CreateArmy;
//# sourceMappingURL=CreateArmy.js.map