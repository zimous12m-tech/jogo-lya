export function qs<T extends Element>(parent: ParentNode, selector: string): T {
  const el = parent.querySelector<T>(selector);
  if (!el) throw new Error('Elemento em falta: ' + selector);
  return el;
}
