import { state } from '@askrjs/askr';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectItemText,
} from '../../../ui/primitives/select';

export function SelectDemo() {
  const [value, setValue] = state('');

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Select value={value()} onValueChange={(v: string) => setValue(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a theme…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <SelectItemText>Default</SelectItemText>
            </SelectItem>
            <SelectItem value="tuxedo">
              <SelectItemText>Tuxedo</SelectItemText>
            </SelectItem>
            <SelectItem value="calico">
              <SelectItemText>Calico</SelectItemText>
            </SelectItem>
            <SelectItem value="ginger">
              <SelectItemText>Ginger</SelectItemText>
            </SelectItem>
          </SelectContent>
        </Select>
        <div class="demo-output">Selected: {value() || 'none'}</div>
      </div>
    </div>
  );
}
