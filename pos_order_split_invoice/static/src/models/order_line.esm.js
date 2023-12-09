/** @odoo-module **/

import {Orderline} from "@point_of_sale/app/store/models";
import {patch} from "@web/core/utils/patch";
const {DateTime} = luxon;

patch(Orderline.prototype, {
    export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.split_invoice_amount = this.split_invoice_amount(
            this.order.pricelist,
            this.quantity
        );
        return json;
    },
    split_invoice_amount(pricelist, quantity, price_extra = 0, recurring = false) {
        const date = DateTime.now();
        const rules = (
            this.product.applicablePricelistItems[pricelist.id] || []
        ).filter((item) => this.product.isPricelistItemUsable(item, date));
        const rule = rules.find(
            (check_rule) =>
                !check_rule.min_quantity || quantity >= check_rule.min_quantity
        );
        if (rule && rule.compute_price === "split") {
            return (
                (this.product.get_price(
                    rule.split_base_pricelist_id,
                    quantity,
                    price_extra,
                    recurring
                ) *
                    rule.split_percentage) /
                100
            );
        }
        return 0;
    },
});
