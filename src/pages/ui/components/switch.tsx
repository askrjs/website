import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('switch');

export function SwitchShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
