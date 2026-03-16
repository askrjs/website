import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("progress-circle");

export function ProgressCircleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
