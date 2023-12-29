/** @odoo-module **/

import {ConfirmPopup} from "@point_of_sale/app/utils/confirm_popup/confirm_popup";
import {Order} from "@point_of_sale/app/store/models";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";

patch(Order.prototype, {
    async pay() {
        if (
            Boolean(!this.partner) &&
            this.orderlines.filter((line) => {
                return line.split_invoice_amount(this.pricelist, line.quantity) > 0;
            }).length > 0
        ) {
            await this.env.services.popup.add(ConfirmPopup, {
                title: _t("Partner is not defined"),
                body: _t(
                    "You need to define a partner because some lines will be splitted"
                ),
            });
            return;
        }
        return super.pay();
    },
});
