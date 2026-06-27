import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('field');

export function FieldShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
