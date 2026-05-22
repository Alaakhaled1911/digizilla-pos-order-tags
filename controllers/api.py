import json
from odoo import http
from odoo.http import request, Response


class DigizillaOrderTagsAPI(http.Controller):

    @http.route(
        '/api/digizilla/order-tags',
        type='http',
        auth='user',
        methods=['POST'],
        csrf=False,
    )
    def create_order_tag(self, **kwargs):

        try:
            body = request.httprequest.get_data(as_text=True)
            data = json.loads(body) if body else {}

            name = data.get('name', '').strip()
            if not name:
                return Response(
                    json.dumps({
                        'success': False,
                        'error': '"name" field is required and cannot be empty.',
                    }),
                    status=400,
                )

            color = data.get('color', 0)
            if not isinstance(color, int) or not (0 <= color <= 11):
                color = 0


            tag = request.env['digizilla.order.tags'].create({
                'name': name,
                'color': color,
            })

            return Response(
                json.dumps({
                    'success': True,
                    'tags': {
                        'id': tag.id,
                        'name': tag.name,
                        'color': tag.color,
                    }
                }),
                status=201,
            )

        except Exception as e:
            return Response(
                json.dumps({
                    'success': False,
                    'error': str(e),
                }),
                status=500,
            )

    # @http.route(
    #     '/api/digizilla/order-tags',
    #     type='http',
    #     auth='user',
    #     methods=['GET'],
    #     csrf=False,
    # )
    # def list_order_tags(self, **kwargs):
    #
    #     try:
    #         tags = request.env['digizilla.order.tags'].search([])
    #         return Response(
    #             json.dumps({
    #                 'success': True,
    #                 'data': [
    #                     {'id': t.id, 'name': t.name, 'color': t.color}
    #                     for t in tags
    #                 ]
    #             }),
    #             status=200,
    #
    #         )
    #     except Exception as e:
    #         return Response(
    #             json.dumps({'success': False, 'error': str(e)}),
    #             status=500,
    #             mimetype='application/json',
    #         )
