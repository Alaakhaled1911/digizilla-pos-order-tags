/** @odoo-module **/

import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { patch } from "@web/core/utils/patch";
import { OrderWidget } from "@point_of_sale/app/generic_components/order_widget/order_widget";

const LIGHT_COLORS = new Set([0, 3]);

const COLOR_MAP = {
  0: "#FFFFFF",
  1: "#FF0000",
  2: "#FF8C00",
  3: "#FFC107",
  4: "#00C09D",
  5: "#00B5E2",
  6: "#0074D9",
  7: "#875A7B",
  8: "#00D1B2",
  9: "#E91E63",
  10: "#4CAF50",
  11: "#795548",
};

export class OrderTagDisplay extends Component {
  static template = "digizilla_pos_order_tags.OrderTagDisplay";

  setup() {
    this.pos = usePos();
  }

  get selectedTags() {
    const order = this.pos.get_order();
    if (!order || !order.uiState?.digizilla_tag_ids?.length) return [];
    const allTags = this.pos.models["digizilla.order.tags"].getAll();
    return allTags.filter((tag) =>
      order.uiState.digizilla_tag_ids.includes(tag.id),
    );
  }

  getColor(colorIndex) {
    return COLOR_MAP[colorIndex] || COLOR_MAP[0];
  }

  getTextColor(colorIndex) {
    return LIGHT_COLORS.has(colorIndex) ? "#212529" : "#FFFFFF";
  }
}

patch(OrderWidget, {
  components: {
    ...OrderWidget.components,
    OrderTagDisplay,
  },
});
