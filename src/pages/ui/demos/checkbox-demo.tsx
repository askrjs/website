import { state, derive } from "@askrjs/askr";
import { Checkbox } from "@askrjs/askr-ui/primitives/checkbox";

export function CheckboxDemo() {
  const checked = state(false);
  const label = derive(() => (checked() ? "Checked" : "Unchecked"));

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-row">
        <Checkbox
          checked={checked()}
          onCheckedChange={(v: boolean) => checked.set(v)}
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
