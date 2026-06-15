import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('container');

export function ContainerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
