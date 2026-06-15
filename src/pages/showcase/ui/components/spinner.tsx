import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('spinner');

export function SpinnerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
