import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('center');

export function CenterShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
