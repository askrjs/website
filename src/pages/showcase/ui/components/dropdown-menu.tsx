import { UiComponentDetailPage } from '../_component-detail';

import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('dropdown-menu');

export function DropdownMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
