import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('select');

export function SelectShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
