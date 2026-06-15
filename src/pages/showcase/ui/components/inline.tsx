import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('inline');

export function InlineShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
