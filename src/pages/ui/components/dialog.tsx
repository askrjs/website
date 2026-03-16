import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("dialog");

export function DialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
