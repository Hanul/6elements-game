import { el, Popup } from "@hanul/skynode";

export default class AppendUnits extends Popup {

    constructor() {
        super(".popup");
        this.append(el(".content.append-units"));
    }
}
