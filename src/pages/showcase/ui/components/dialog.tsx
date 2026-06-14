import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('dialog');

export function DialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
