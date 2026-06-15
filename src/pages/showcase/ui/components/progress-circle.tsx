import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('progress-circle');

export function ProgressCircleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
