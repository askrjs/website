import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('focus-scope');

export function FocusScopeShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
