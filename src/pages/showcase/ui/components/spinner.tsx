import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('spinner');

export function SpinnerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
