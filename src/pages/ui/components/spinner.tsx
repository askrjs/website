import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("spinner");

export function SpinnerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
