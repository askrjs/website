import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('badge');

export function BadgeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
