import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('slider');

export function SliderShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
