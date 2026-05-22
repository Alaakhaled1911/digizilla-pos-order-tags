/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { usePos } from "@point_of_sale/app/store/pos_hook";

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

export class OrderTagPopup extends Component {
  static template = "digizilla_pos_order_tags.OrderTagPopup";
  static components = { Dialog };
  static props = {
    title: { type: String, optional: true },
    preSelectedTagIds: { type: Array, optional: true },
    getPayload: Function,
    close: Function,
  };
  static defaultProps = {
    title: "Select Order Tags",
    preSelectedTagIds: [],
  };

  setup() {
    this.pos = usePos();
    this.state = useState({
      selectedTagIds: [...(this.props.preSelectedTagIds || [])],
    });
  }

  get availableTags() {
    return this.pos.models["digizilla.order.tags"].getAll();
  }

  isSelected(tagId) {
    return this.state.selectedTagIds.includes(tagId);
  }

  toggleTag(tagId) {
    const idx = this.state.selectedTagIds.indexOf(tagId);
    if (idx >= 0) {
      this.state.selectedTagIds.splice(idx, 1);
    } else {
      this.state.selectedTagIds.push(tagId);
    }
  }

  getColor(colorIndex) {
    return COLOR_MAP[colorIndex] || COLOR_MAP[0];
  }

  confirm() {
    this.props.getPayload({ tagIds: [...this.state.selectedTagIds] });
    this.props.close();
  }

  close() {
    this.props.close();
  }
}
