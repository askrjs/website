import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('alert-dialog');

export function AlertDialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
