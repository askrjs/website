import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('menu');

export function MenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
