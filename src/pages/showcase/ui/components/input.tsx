import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('input');

export function InputShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
