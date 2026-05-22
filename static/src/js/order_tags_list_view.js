/** @odoo-module **/

import { ListController } from "@web/views/list/list_controller";
import { listView } from "@web/views/list/list_view";
import { registry } from "@web/core/registry";

class OrderTagsListController extends ListController {
  async createRecord() {
    await this.actionService.doAction({
      type: "ir.actions.act_window",
      res_model: "digizilla.order.tags",
      views: [[false, "form"]],
      target: "current",
    });
  }
}

registry.category("views").add("order_tags_list", {
  ...listView,
  Controller: OrderTagsListController,
});
