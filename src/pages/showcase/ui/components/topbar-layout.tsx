import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('topbar-layout');

export function TopbarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
