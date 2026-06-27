import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('spinner');

export function SpinnerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
