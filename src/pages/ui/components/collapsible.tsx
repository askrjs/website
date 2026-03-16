import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("collapsible");

export function CollapsibleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
