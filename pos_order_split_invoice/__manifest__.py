# Copyright 2023 Dixmit
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "Pos Split Invoice",
    "summary": """
        Allow to generatea secondary invoice from a point of sale order for a second partner""",
    "version": "17.0.1.0.0",
    "license": "AGPL-3",
    "author": "Dixmit,Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/pos",
    "depends": ["point_of_sale"],
    "data": [
        "views/pos_session.xml",
        "views/product_pricelist.xml",
    ],
    "demo": [],
}
