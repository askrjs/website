import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('stack');

export function StackShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
