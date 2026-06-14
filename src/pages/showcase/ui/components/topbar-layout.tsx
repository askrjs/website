import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('topbar-layout');

export function TopbarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
