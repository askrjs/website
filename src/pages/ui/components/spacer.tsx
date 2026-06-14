import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('spacer');

export function SpacerShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
