import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("alert-dialog");

export function AlertDialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
