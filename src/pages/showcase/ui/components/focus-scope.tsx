import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('focus-scope');

export function FocusScopeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
