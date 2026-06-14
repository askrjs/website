import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('label');

export function LabelShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
