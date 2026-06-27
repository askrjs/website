import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('popover');

export function PopoverShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
