import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('textarea');

export function TextareaShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
