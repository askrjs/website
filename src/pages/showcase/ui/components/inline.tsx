import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('inline');

export function InlineShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
