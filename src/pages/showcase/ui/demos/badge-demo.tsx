import { Badge } from '@askrjs/themes/components';

export function BadgeDemo() {
  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-row">
        <Badge>Default</Badge>
        <Badge>New</Badge>
        <Badge>v1.0.0</Badge>
        <Badge>Beta</Badge>
      </div>
    </div>
  );
}
