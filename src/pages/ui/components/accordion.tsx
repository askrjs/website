import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("accordion");

export function AccordionShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
