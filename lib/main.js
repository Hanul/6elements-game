"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const GameBoard_1 = __importDefault(require("./game/GameBoard"));
const RewardPanel_1 = __importDefault(require("./ui/RewardPanel"));
skynode_1.BodyNode.style({
    background: "#faf8ef",
});
const buttonStyle = {
    display: "block",
    background: "#8f7a66",
    color: "#f9f6f2",
    lineHeight: 42,
    padding: "0 20px",
    borderRadius: 3,
};
skynode_1.el("div", {
    style: {
        width: 500,
    },
}, skynode_1.el("h1", "Defantasy", {
    style: {
        fontFamily: "font1",
        fontSize: 80,
        color: "#776e65",
    },
}), skynode_1.el("p", "This is defantasy game.", {
    style: {
        fontSize: 18,
        color: "#776e65",
    },
}), new RewardPanel_1.default(), new GameBoard_1.default(), skynode_1.el("div", {
    style: {
        display: "flex",
    },
}, skynode_1.el("a", "Be Summoner", {
    style: buttonStyle,
    click: () => { },
}), skynode_1.el("div", { style: { flexGrow: 1 } }), skynode_1.el("a", "Be Supporter", {
    style: buttonStyle,
    click: () => { },
}))).appendTo(skynode_1.BodyNode);
//# sourceMappingURL=main.js.map