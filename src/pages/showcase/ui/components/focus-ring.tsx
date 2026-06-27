import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('focus-ring');

export function FocusRingShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
