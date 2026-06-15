import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('badge');

export function BadgeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
