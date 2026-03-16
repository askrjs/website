import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("label");

export function LabelShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
