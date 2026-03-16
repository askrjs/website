import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("toggle");

export function ToggleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
