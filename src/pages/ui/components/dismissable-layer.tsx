import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("dismissable-layer");

export function DismissableLayerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
