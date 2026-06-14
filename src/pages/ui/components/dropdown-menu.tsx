import { UiComponentDetailPage } from '../component-detail';

import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('dropdown-menu');

export function DropdownMenuShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
