import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('stack');

export function StackShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
