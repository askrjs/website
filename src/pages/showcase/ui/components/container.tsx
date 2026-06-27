import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('container');

export function ContainerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
