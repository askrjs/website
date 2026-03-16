import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("topbar-layout");

export function TopbarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
