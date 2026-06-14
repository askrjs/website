import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('container');

export function ContainerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
