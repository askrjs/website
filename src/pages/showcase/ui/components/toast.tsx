import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('toast');

export function ToastShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
