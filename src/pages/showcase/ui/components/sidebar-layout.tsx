import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('sidebar-layout');

export function SidebarLayoutShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
