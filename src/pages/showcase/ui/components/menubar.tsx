import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('menubar');

export function MenubarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
