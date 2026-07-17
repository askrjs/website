import { state } from '@askrjs/askr';
import { Button } from '@askrjs/ui/button';

export function ButtonDemo() {
  const [clicks, setClicks] = state(0);

  return (
    <div class="demo-area">
      <h4>Live demo</h4>
      <div class="demo-row">
        <Button onPress={() => setClicks((v) => v + 1)}>Primary</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div class="demo-output">Pressed {clicks()} times</div>
    </div>
  );
}
