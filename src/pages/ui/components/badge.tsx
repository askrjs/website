import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("badge");

export function BadgeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
