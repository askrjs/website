import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('tooltip');

export function TooltipShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
