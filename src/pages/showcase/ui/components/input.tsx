import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('input');

export function InputShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
