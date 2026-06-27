import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('toggle');

export function ToggleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
