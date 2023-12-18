/** @odoo-module */

import {Component} from "@odoo/owl";
import {ProductScreen} from "@point_of_sale/app/screens/product_screen/product_screen";
import {usePos} from "@point_of_sale/app/store/pos_hook";

export class PosposeOrderButton extends Component {
    setup() {
        this.pos = usePos();
    }
    click() {
        this.pos.showScreen("PosposeOrderScreen");
    }
}
PosposeOrderButton.template = "pos_pospose_order.PosposeOrderButton";

ProductScreen.addControlButton({
    component: PosposeOrderButton,
    condition: function () {
        return true;
    },
});
