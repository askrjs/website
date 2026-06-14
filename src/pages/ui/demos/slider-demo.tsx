import { state } from '@askrjs/askr';
import {
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
} from '../../../ui/primitives/slider';

export function SliderDemo() {
  const [value, setValue] = state(50);

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Slider
          value={value()}
          onValueChange={(v: number) => setValue(v)}
          min={0}
          max={100}
          step={1}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <div class="demo-output">Value: {value()}</div>
      </div>
    </div>
  );
}
