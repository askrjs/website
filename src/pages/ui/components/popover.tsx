import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("popover");

export function PopoverShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
