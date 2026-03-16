import { UiComponentDetailPage } from "../component-detail";
import { requireUiComponent } from "../../../pages/shared/ui-component-registry";

const meta = requireUiComponent("breadcrumb");

export function BreadcrumbShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
