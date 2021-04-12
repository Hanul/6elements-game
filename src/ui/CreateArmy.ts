import { el, Popup } from "@hanul/skynode";

export default class CreateArmy extends Popup {

    constructor() {
        super(".popup");
        this.append(el(".content.create-army"));
    }
}
