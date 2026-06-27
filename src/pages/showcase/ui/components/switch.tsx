import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('switch');

export function SwitchShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
