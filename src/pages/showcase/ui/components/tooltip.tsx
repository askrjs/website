import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('tooltip');

export function TooltipShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
