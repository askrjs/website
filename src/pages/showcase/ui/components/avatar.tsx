import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('avatar');

export function AvatarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
