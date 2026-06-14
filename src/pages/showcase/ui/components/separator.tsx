import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('separator');

export function SeparatorShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
