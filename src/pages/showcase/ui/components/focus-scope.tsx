import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('focus-scope');

export function FocusScopeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
