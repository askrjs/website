import { state } from "@askrjs/askr";
import { Slider, SliderTrack, SliderRange, SliderThumb } from "@askrjs/askr-ui/primitives/slider";

export function SliderDemo() {
  const value = state(50);

  return (
    <div class="demo-area">
      <h4>Live Demo</h4>
      <div class="demo-stack">
        <Slider
          value={value()}
          onValueChange={(v: number) => value.set(v)}
          min={0}
          max={100}
          step={1}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <div class="demo-output">
          Value: {value}
        </div>
      </div>
    </div>
  );
}
