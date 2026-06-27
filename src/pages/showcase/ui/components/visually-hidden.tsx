import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('visually-hidden');

export function VisuallyHiddenShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
