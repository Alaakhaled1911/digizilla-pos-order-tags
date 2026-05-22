{
    'name': 'Digizilla POS Order Tags',
    'version': '18.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Add mandatory order tags to POS orders',
    'author': 'Alaa Khaled',
    'depends': ['point_of_sale'],
    'data': [
        'security/ir.model.access.csv',
        'views/order_tags_views.xml',
        'views/pos_order_tag_menus.xml',
    ],
'assets': {
'web.assets_backend': [
        'digizilla_pos_order_tags/static/src/js/order_tags_list_view.js',
    ],
'point_of_sale._assets_pos': [
    'digizilla_pos_order_tags/static/src/scss/pos_tags.scss',
    'digizilla_pos_order_tags/static/src/xml/components/order_tag_button.xml',
    'digizilla_pos_order_tags/static/src/xml/components/order_tag_display.xml',
    'digizilla_pos_order_tags/static/src/xml/components/order_tag_popup.xml',
    'digizilla_pos_order_tags/static/src/xml/patches/order_widget_patch.xml',
    'digizilla_pos_order_tags/static/src/js/components/order_tag_display/OrderTagDisplay.js',
    'digizilla_pos_order_tags/static/src/js/components/order_tag_popup/OrderTagPopup.js',
    'digizilla_pos_order_tags/static/src/js/patches/PosOrderPatch.js',
    'digizilla_pos_order_tags/static/src/js/patches/PaymentScreenPatch.js',
    'digizilla_pos_order_tags/static/src/js/components/order_tag_button/OrderTagButton.js',
],
},
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}