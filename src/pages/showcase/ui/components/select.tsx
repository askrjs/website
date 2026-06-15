import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('select');

export function SelectShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
