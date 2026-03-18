import { Badge } from "@askrjs/askr-ui/badge";

export function BadgeDemo() {
  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Badge>Default</Badge>
        <Badge>New</Badge>
        <Badge>v1.0.0</Badge>
        <Badge>Beta</Badge>
      </div>
    </div>
  );
}
