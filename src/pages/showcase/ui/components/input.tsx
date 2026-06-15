import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('input');

export function InputShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
