export interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark(props: BrandMarkProps) {
  return (
    <span class={props.compact ? 'brand-mark compact' : 'brand-mark'}>
      <img
        class="brand-mark-symbol"
        src="/assets/askr-logo.png"
        alt=""
        width="40"
        height="40"
      />
      <span class="brand-mark-word">Askr</span>
    </span>
  );
}