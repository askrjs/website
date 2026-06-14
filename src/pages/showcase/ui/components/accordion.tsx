import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('accordion');

export function AccordionShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
