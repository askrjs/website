import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('progress');

export function ProgressShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
