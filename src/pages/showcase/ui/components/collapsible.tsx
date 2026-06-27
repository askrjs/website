import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('collapsible');

export function CollapsibleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
