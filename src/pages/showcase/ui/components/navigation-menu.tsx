import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('navigation-menu');

export function NavigationMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
