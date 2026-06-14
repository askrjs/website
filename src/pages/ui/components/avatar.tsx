import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('avatar');

export function AvatarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
