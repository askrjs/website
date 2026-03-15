export const Fragment = Symbol.for('askr.fragment');

function flattenChildren(children: unknown[]): unknown[] {
  const flat: unknown[] = [];

  for (const child of children) {
    if (Array.isArray(child)) {
      flat.push(...flattenChildren(child));
      continue;
    }

    if (child === undefined || child === null || child === false) {
      continue;
    }

    flat.push(child);
  }

  return flat;
}

export function jsx(type: unknown, props: Record<string, unknown>, ...children: unknown[]) {
  if (children.length > 0) {
    const flatChildren = flattenChildren(children);
    props = {
      ...props,
      children: flatChildren.length === 1 ? flatChildren[0] : flatChildren,
    };
  }
  return { type, props };
}
