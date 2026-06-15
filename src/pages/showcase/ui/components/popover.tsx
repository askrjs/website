import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('popover');

export function PopoverShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
