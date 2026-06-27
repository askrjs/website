import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('grid');

export function GridShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
