import { BodyNode, el } from "@hanul/skynode";
import GameBoard from "./game/GameBoard";
import RewardPanel from "./ui/RewardPanel";

BodyNode.style({
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

el("div",
    {
        style: {
            width: 500,
        },
    },
    el("h1", "Defantasy", {
        style: {
            fontFamily: "font1",
            fontSize: 80,
            color: "#776e65",
        },
    }),
    el("p", "This is defantasy game.", {
        style: {
            fontSize: 18,
            color: "#776e65",
        },
    }),
    new RewardPanel(),
    new GameBoard(),
    el("div",
        {
            style: {
                display: "flex",
            },
        },
        el("a", "Be Summoner", {
            style: buttonStyle,
            click: () => { },
        }),
        el("div", { style: { flexGrow: 1 } }),
        el("a", "Be Supporter", {
            style: buttonStyle,
            click: () => { },
        }),
    ),
).appendTo(BodyNode);
