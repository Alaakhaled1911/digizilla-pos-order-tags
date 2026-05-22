/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";

patch(PaymentScreen.prototype, {
  setup() {
    super.setup(...arguments);
    this.notification = useService("notification");
  },

  async validateOrder(isForceValidate) {
    const order = this.pos.get_order();

    if (!order.uiState?.digizilla_tag_ids?.length) {
      this.notification.add(
        _t(
          "You must select at least one Order Tag before validating this order.",
        ),
        {
          title: _t("Order Tag Required"),
          type: "danger",
        },
      );
      return;
    }

    return super.validateOrder(...arguments);
  },
});
