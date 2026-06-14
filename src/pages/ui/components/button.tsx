import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('button');

export function ButtonShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
