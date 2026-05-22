from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = 'pos.order'

    tag_ids = fields.Many2many(
        'digizilla.order.tags',
        string='Order Tags'
    )

    @api.model
    def _order_fields(self, ui_order):
        result = super()._order_fields(ui_order)
        tag_ids = ui_order.get('tag_ids', [])
        if tag_ids:
            result['tag_ids'] = [(6, 0, tag_ids)]
        return result


