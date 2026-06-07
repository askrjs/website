import { state, derive } from "@askrjs/askr";
import { Switch } from "@askrjs/askr-ui/primitives/switch";

export function SwitchDemo() {
  const on = state(false);
  const label = derive(() => (on() ? "Enabled" : "Disabled"));

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Switch checked={on()} onCheckedChange={(v: boolean) => on.set(v)} />
        <span>{label}</span>
      </div>
    </div>
  );
}
