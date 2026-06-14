import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('switch');

export function SwitchShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
