export function openSheet(title: string, build: (body: HTMLElement) => void): void {
  const dialog = document.createElement('dialog');
  dialog.className = 'sheet';
  const header = document.createElement('div');
  header.className = 'sheet__header';
  const h = document.createElement('h2');
  h.textContent = title;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn btn--ghost btn--icon';
  close.textContent = 'x';
  close.setAttribute('aria-label', 'Fechar');
  header.append(h, close);
  const body = document.createElement('div');
  body.className = 'sheet__body';
  dialog.append(header, body);
  document.body.append(dialog);
  const finish = (): void => { dialog.close(); dialog.remove(); };
  close.addEventListener('click', finish);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); finish(); });
  build(body);
  dialog.showModal();
  h.tabIndex = -1;
  h.focus();
}
