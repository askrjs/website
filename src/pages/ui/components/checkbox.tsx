import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('checkbox');

export function CheckboxShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
