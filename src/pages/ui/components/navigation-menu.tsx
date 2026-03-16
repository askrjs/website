import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("navigation-menu");

export function NavigationMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
