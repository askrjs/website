import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("textarea");

export function TextareaShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
