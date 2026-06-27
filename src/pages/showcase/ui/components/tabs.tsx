import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('tabs');

export function TabsShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
