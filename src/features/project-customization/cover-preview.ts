const initialCovers = new WeakMap<HTMLElement, DocumentFragment>();
const objectUrls = new WeakMap<HTMLDialogElement, string>();

function snapshot(container: HTMLElement): DocumentFragment {
  const existing = initialCovers.get(container);
  if (existing) return existing;
  const fragment = document.createDocumentFragment();
  container.childNodes.forEach((node) => {
    fragment.append(node.cloneNode(true));
  });
  initialCovers.set(container, fragment);
  return fragment;
}

function restore(container: HTMLElement): void {
  container.replaceChildren(snapshot(container).cloneNode(true));
}

function clearObjectUrl(dialog: HTMLDialogElement): void {
  const url = objectUrls.get(dialog);
  if (url) URL.revokeObjectURL(url);
  objectUrls.delete(dialog);
}

function previewFile(dialog: HTMLDialogElement, container: HTMLElement, file: File): void {
  clearObjectUrl(dialog);
  const url = URL.createObjectURL(file);
  objectUrls.set(dialog, url);
  const image = document.createElement('img');
  image.src = url;
  image.alt = 'Aperçu de la nouvelle couverture';
  container.replaceChildren(image);
}

export function installCustomizationCoverPreview(root: Document = document): () => void {
  const change = (event: Event): void => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const dialog = input.closest<HTMLDialogElement>('[data-project-customization-dialog]');
    const container = dialog?.querySelector<HTMLElement>('.customization-preview__cover');
    if (!dialog || !container) return;
    snapshot(container);

    if (input.name === 'cover') {
      const file = input.files?.[0];
      if (file) {
        previewFile(dialog, container, file);
        const remove = dialog.querySelector<HTMLInputElement>('input[name="removeCover"]');
        if (remove) remove.checked = false;
      } else restore(container);
    }

    if (input.name === 'removeCover') {
      const cover = dialog.querySelector<HTMLInputElement>('input[name="cover"]');
      if (input.checked) {
        clearObjectUrl(dialog);
        if (cover) cover.value = '';
        const title = dialog.querySelector('h2')?.textContent?.replace(/^Personnaliser\s+/u, '') ?? 'LG';
        const initials = title.split(/[\s_-]+/u).filter(Boolean).slice(0, 2)
          .map((word) => word[0]?.toUpperCase() ?? '').join('') || 'LG';
        container.textContent = initials;
      } else restore(container);
    }
  };

  const close = (event: Event): void => {
    const dialog = event.target;
    if (dialog instanceof HTMLDialogElement) clearObjectUrl(dialog);
  };

  root.addEventListener('change', change);
  root.addEventListener('close', close, true);
  return () => {
    root.removeEventListener('change', change);
    root.removeEventListener('close', close, true);
  };
}
