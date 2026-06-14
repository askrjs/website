import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('collapsible');

export function CollapsibleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
