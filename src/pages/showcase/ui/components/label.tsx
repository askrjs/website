import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('label');

export function LabelShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
