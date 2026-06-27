import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('badge');

export function BadgeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
