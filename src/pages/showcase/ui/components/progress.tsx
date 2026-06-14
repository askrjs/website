import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('progress');

export function ProgressShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
