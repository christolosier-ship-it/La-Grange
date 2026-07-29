export interface ConfirmationModalOptions {
  readonly title: string;
  readonly description: string;
  readonly confirmLabel: string;
  readonly destructive?: boolean;
  readonly onConfirm: () => Promise<void> | void;
  readonly onCancel?: () => void;
}

function focusableElements(dialog: HTMLElement): HTMLElement[] {
  return [...dialog.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )];
}

export function openConfirmationModal(
  trigger: HTMLElement,
  options: ConfirmationModalOptions,
  documentObject: Document = document,
): HTMLElement {
  const overlay = documentObject.createElement('div');
  overlay.className = 'modal-overlay';
  const dialog = documentObject.createElement('section');
  dialog.className = 'confirmation-modal';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');

  const title = documentObject.createElement('h2');
  title.id = `confirmation-title-${String(Date.now())}`;
  title.textContent = options.title;
  dialog.setAttribute('aria-labelledby', title.id);
  const description = documentObject.createElement('p');
  description.id = `${title.id}-description`;
  description.textContent = options.description;
  dialog.setAttribute('aria-describedby', description.id);

  const actions = documentObject.createElement('div');
  actions.className = 'confirmation-modal__actions';
  const cancel = documentObject.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Annuler';
  const confirm = documentObject.createElement('button');
  confirm.type = 'button';
  confirm.textContent = options.confirmLabel;
  confirm.className = options.destructive ? 'is-destructive' : '';
  actions.append(cancel, confirm);
  dialog.append(title, description, actions);
  overlay.append(dialog);
  documentObject.body.append(overlay);

  let closed = false;
  const close = (confirmed: boolean): void => {
    if (closed) return;
    closed = true;
    documentObject.removeEventListener('keydown', onKeyDown);
    overlay.remove();
    trigger.focus({ preventScroll: true });
    if (!confirmed) options.onCancel?.();
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = focusableElements(dialog);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && documentObject.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && documentObject.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  cancel.addEventListener('click', () => {
    close(false);
  });
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      close(false);
    }
  });
  confirm.addEventListener('click', () => {
    confirm.disabled = true;
    cancel.disabled = true;
    void Promise.resolve(options.onConfirm())
      .then(() => {
        close(true);
      })
      .catch(() => {
        confirm.disabled = false;
        cancel.disabled = false;
        confirm.focus();
      });
  });
  documentObject.addEventListener('keydown', onKeyDown);
  cancel.focus();
  return overlay;
}
