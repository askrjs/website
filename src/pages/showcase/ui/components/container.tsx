import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('container');

export function ContainerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
