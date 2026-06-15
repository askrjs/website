import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('button');

export function ButtonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
