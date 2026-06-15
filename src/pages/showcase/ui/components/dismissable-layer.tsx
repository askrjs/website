import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('dismissable-layer');

export function DismissableLayerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
