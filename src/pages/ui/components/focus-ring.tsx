import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("focus-ring");

export function FocusRingShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
