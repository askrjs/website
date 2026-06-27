import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('avatar');

export function AvatarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
