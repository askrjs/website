import { state, derive } from "@askrjs/askr";
import { Toggle } from "@askrjs/askr-ui/primitives/toggle";

export function ToggleDemo() {
  const pressed = state(false);
  const label = derive(() => (pressed() ? "On" : "Off"));

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Toggle
          pressed={pressed()}
          onPressedChange={(v: boolean) => pressed.set(v)}
        >
          Toggle
        </Toggle>
        <span class="demo-output" style="margin-top:0">{label}</span>
      </div>
    </div>
  );
}
