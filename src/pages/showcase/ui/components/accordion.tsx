import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('accordion');

export function AccordionShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
