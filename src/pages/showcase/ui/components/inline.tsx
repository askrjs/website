import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('inline');

export function InlineShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
