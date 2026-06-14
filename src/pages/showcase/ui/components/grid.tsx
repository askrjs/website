import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('grid');

export function GridShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
