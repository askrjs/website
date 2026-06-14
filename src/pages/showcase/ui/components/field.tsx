import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('field');

export function FieldShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
