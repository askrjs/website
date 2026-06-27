import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('toast');

export function ToastShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
