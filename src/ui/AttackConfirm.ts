import { el, Popup } from "@hanul/skynode";

export default class AttackConfirm extends Popup {

    constructor() {
        super(".popup");
        this.append(el(".content.attack-confirm"));
    }
}
