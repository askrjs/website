import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('select');

export function SelectShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
