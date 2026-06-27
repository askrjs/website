import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('separator');

export function SeparatorShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
