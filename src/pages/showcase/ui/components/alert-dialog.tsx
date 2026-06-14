import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('alert-dialog');

export function AlertDialogShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
