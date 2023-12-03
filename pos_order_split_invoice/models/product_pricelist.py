# Copyright 2023 Dixmit
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import api, fields, models


class ProductPricelist(models.Model):
    _inherit = "product.pricelist"

    split_invoice_partner_id = fields.Many2one(
        "res.partner",
        tracking=True,
    )


class ProductPricelistItem(models.Model):
    _inherit = "product.pricelist.item"

    split_invoice_partner_id = fields.Many2one(
        "res.partner", related="pricelist_id.split_invoice_partner_id", readonly=True
    )
    compute_price = fields.Selection(
        selection_add=[("split", "Split Invoice")], ondelete={"split": "set default"}
    )
    split_percentage = fields.Float(
        compute="_compute_split_percentage",
        inverse="_inverse_split_percentage",
        readonly=False,
    )

    @api.depends("price_discount")
    def _compute_split_percentage(self):
        for record in self:
            record.split_percentage = 100 - record.price_discount

    def _inverse_split_percentage(self):
        for record in self:
            if record.compute_price == "split":
                record.price_discount = 100 - record.split_percentage
                record.price_surcharge = 0
                record.price_round = 0
                record.price_min_margin = 0
                record.price_max_margin = 0
