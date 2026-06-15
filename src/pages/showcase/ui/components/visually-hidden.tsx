import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('visually-hidden');

export function VisuallyHiddenShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
