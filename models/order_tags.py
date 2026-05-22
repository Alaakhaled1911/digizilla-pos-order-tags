from odoo import api, models, fields


class DigizillaOrderTags(models.Model):
    _name = 'digizilla.order.tags'
    _description = 'Digizilla Order Tags'
    _inherit = ['pos.load.mixin']
    name = fields.Char(string='Tag', required=True)
    color = fields.Integer(string='Color', default=0)

    @api.model
    def _load_pos_data_fields(self, config_id):
        return ['id', 'name', 'color']

