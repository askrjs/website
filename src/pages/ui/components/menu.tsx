import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("menu");

export function MenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
