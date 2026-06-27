import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('spacer');

export function SpacerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
