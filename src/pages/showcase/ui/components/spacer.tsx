import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('spacer');

export function SpacerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
