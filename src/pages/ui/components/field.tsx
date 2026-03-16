import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("field");

export function FieldShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
