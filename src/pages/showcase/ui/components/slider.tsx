import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('slider');

export function SliderShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
