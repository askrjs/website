import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('sidebar-layout');

export function SidebarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
