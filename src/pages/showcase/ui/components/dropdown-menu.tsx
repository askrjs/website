import { UiComponentDetailPage } from '../_component-detail';

import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('dropdown-menu');

export function DropdownMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
