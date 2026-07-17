import { state, derive } from '@askrjs/askr';
import { Switch } from '@askrjs/ui/switch';

export function SwitchDemo() {
  const [on, setOn] = state(false);
  const label = derive(() => (on() ? 'Enabled' : 'Disabled'));

  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-row">
        <Switch checked={on()} onCheckedChange={(v: boolean) => setOn(v)} />
        <span>{label()}</span>
      </div>
    </div>
  );
}
