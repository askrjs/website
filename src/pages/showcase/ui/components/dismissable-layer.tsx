import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('dismissable-layer');

export function DismissableLayerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
