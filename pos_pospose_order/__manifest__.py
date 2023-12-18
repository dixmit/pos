# Copyright 2023 Dixmit
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "Pos Pospose Order",
    "summary": """
        Pospose an order in the PoS interface""",
    "version": "17.0.1.0.0",
    "license": "AGPL-3",
    "author": "Dixmit,Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/pos",
    "depends": ["point_of_sale"],
    "data": [],
    "demo": [],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_pospose_order/static/src/app/screens/pospose_order_screen.esm.js",
            "pos_pospose_order/static/src/app/screens/pospose_order_screen.xml",
            "pos_pospose_order/static/src/app/pospose_order_control_button.esm.js",
            "pos_pospose_order/static/src/app/pospose_order_control_button.xml",
        ],
    },
}
