import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('navigation-menu');

export function NavigationMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
