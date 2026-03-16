import { jsx } from "../../../runtime/jsx";

import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("pagination");

export function PaginationShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
