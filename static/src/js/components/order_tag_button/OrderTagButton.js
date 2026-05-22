/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { makeAwaitable } from "@point_of_sale/app/store/make_awaitable_dialog";
import { OrderTagPopup } from "@digizilla_pos_order_tags/js/components/order_tag_popup/OrderTagPopup";

patch(ControlButtons.prototype, {
  async clickOrderTags() {
    const order = this.pos.get_order();
    if (!order) return;

    const result = await makeAwaitable(this.dialog, OrderTagPopup, {
      preSelectedTagIds: [...(order.uiState.digizilla_tag_ids || [])],
    });

    if (result) {
      order.setOrderTags(result.tagIds);
    }
  },
});
