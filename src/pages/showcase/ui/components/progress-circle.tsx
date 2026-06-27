import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('progress-circle');

export function ProgressCircleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
