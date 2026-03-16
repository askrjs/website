import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("slider");

export function SliderShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
