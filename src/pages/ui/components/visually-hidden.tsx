import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("visually-hidden");

export function VisuallyHiddenShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
