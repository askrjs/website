import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('separator');

export function SeparatorShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
