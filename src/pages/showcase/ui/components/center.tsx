import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('center');

export function CenterShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
