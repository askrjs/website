import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('stack');

export function StackShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
