/** @odoo-module */

import {Component} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {usePos} from "@point_of_sale/app/store/pos_hook";

export class PosposeOrderItem extends Component {
    setup() {
        this.pos = usePos();
    }
    onClickSelect() {
        this.pos.set_order(this.props.order);
        this.pos.showScreen("ProductScreen");
    }
    get style() {
        if (this.isCurrentOrder) {
            return "background-color: #b0b0b0;";
        }
        return "";
    }
    get isCurrentOrder() {
        return this.props.order === this.pos.get_order();
    }
    onClickRemove() {
        var currentOrder = this.isCurrentOrder;
        this.pos.removeOrder(this.props.order);
        if (currentOrder) {
            if (this.pos.orders.length > 0) {
                this.pos.set_order(this.pos.orders[0]);
            } else {
                this.pos.add_new_order();
                this.pos.showScreen("ProductScreen");
            }
        }
    }
}
PosposeOrderItem.template = "pos_pospose_order.PosposeOrderItem";
export class PosposeOrderScreen extends Component {
    setup() {
        this.pos = usePos();
    }
    get orders() {
        return this.pos.orders;
    }
    onClickNewOrder() {
        this.pos.add_new_order();
        this.pos.showScreen("ProductScreen");
    }
    onClickClose() {
        this.pos.showScreen("ProductScreen");
    }
}
PosposeOrderScreen.template = "pos_pospose_order.PosposeOrderScreen";
PosposeOrderScreen.components = {PosposeOrderItem};
registry.category("pos_screens").add("PosposeOrderScreen", PosposeOrderScreen);
