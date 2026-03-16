import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("focus-scope");

export function FocusScopeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
