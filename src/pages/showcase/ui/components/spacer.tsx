import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('spacer');

export function SpacerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
