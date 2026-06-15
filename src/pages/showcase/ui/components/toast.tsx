import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('toast');

export function ToastShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
