/** @odoo-module **/

import {patch} from "@web/core/utils/patch";
import {Product} from "@point_of_sale/app/store/models";
const {DateTime} = luxon;

patch(Product.prototype, {
    get_price(pricelist, quantity, price_extra = 0, recurring = false) {
        let price = super.get_price(...arguments);
        const date = DateTime.now();
        const rules = !pricelist
            ? []
            : (this.applicablePricelistItems[pricelist.id] || []).filter((item) =>
                  this.isPricelistItemUsable(item, date)
              );
        const rule = rules.find(
            (rule) => !rule.min_quantity || quantity >= rule.min_quantity
        );
        if (rule && rule.compute_price === "split") {
            price -=
                (this.get_price(
                    this.pos.pricelists.find(
                        (pricelist) => pricelist.id === rule.split_base_pricelist_id[0]
                    ),
                    quantity,
                    price_extra,
                    recurring
                ) *
                    rule.split_percentage) /
                100;
        }
        return price;
    },
});
