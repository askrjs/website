import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('accordion');

export function AccordionShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
