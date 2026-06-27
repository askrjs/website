import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('menu');

export function MenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
