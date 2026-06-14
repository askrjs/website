import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('focus-ring');

export function FocusRingShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
