import { UiComponentDetailPage } from '../component-detail';

import { requireUiComponent } from '../registry';

const meta = requireUiComponent('dropdown-menu');

export function DropdownMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
