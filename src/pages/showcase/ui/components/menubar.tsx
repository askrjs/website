import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('menubar');

export function MenubarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
