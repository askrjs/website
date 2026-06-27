import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('select');

export function SelectShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
