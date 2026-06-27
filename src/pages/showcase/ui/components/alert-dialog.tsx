import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('alert-dialog');

export function AlertDialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
