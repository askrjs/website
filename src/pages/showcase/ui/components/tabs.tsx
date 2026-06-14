import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('tabs');

export function TabsShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
