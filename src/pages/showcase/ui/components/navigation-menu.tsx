import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('navigation-menu');

export function NavigationMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
