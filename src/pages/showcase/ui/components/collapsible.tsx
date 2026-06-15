import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('collapsible');

export function CollapsibleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
