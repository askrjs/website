import type { Props } from './props';

declare global {
  namespace JSX {
    type Element = any;

    interface IntrinsicElements {
      [elem: string]: Props;
    }

    interface ElementAttributesProperty {
      props: Props;
    }
  }
}

export {};
