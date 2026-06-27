import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('button');

export function ButtonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
