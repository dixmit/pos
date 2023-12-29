# Copyright 2023 Dixmit
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import fields, models


class AccountMove(models.Model):
    _inherit = "account.move"

    splitting_partner_id = fields.Many2one("res.partner")
    splitting_order_id = fields.Many2one("pos.order")
