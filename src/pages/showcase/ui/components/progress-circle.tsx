import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('progress-circle');

export function ProgressCircleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
