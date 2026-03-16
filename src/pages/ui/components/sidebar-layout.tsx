import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("sidebar-layout");

export function SidebarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
