import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('avatar');

export function AvatarShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
