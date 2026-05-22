/** @odoo-module **/

import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { patch } from "@web/core/utils/patch";

patch(PosOrder.prototype, {
  setup(vals) {
    super.setup(...arguments);
    this.uiState.digizilla_tag_ids = vals.tag_ids || [];
  },

  serialize() {
    const result = super.serialize(...arguments);
    result.tag_ids = this.uiState.digizilla_tag_ids || [];
    return result;
  },

  get hasOrderTags() {
    return this.uiState.digizilla_tag_ids?.length > 0;
  },

  getOrderTagObjects() {
    const allTags = this.models["digizilla.order.tags"].getAll();
    return allTags.filter((tag) =>
      this.uiState.digizilla_tag_ids.includes(tag.id),
    );
  },

  setOrderTags(tagIds) {
    this.uiState.digizilla_tag_ids = tagIds;
  },
});
