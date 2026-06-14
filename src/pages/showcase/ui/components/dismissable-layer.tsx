import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('dismissable-layer');

export function DismissableLayerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
