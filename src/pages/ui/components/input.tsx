import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("input");

export function InputShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
