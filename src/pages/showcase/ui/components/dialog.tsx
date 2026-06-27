import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('dialog');

export function DialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
