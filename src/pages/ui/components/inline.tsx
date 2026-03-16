import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("inline");

export function InlineShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
