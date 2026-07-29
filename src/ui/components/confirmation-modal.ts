import { AppError } from '../../core/errors/app-error';

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

function readableError(error: unknown): string {
  if (error instanceof AppError) return error.userMessage;
  if (error instanceof Error && error.message.trim()) return error.message;
  return 'L’action n’a pas pu être terminée.';
}

function restoreFocus(trigger: HTMLElement, documentObject: Document): void {
  const key = trigger.dataset.focusKey;
  const replacement = key
    ? documentObject.querySelector<HTMLElement>(`[data-focus-key="${CSS.escape(key)}"]`)
    : undefined;
  const target = trigger.isConnected ? trigger : replacement;
  target?.focus({ preventScroll: true });
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
  const error = documentObject.createElement('p');
  error.className = 'confirmation-modal__error';
  error.setAttribute('role', 'alert');
  error.hidden = true;

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
  dialog.append(title, description, error, actions);
  overlay.append(dialog);
  documentObject.body.append(overlay);

  let closed = false;
  let pending = false;
  const close = (confirmed: boolean): void => {
    if (closed || pending) return;
    closed = true;
    documentObject.removeEventListener('keydown', onKeyDown);
    overlay.remove();
    restoreFocus(trigger, documentObject);
    if (!confirmed) options.onCancel?.();
  };

  const closeAfterSuccess = (): void => {
    pending = false;
    close(true);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!pending) close(false);
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
    if (event.target === overlay && !pending) close(false);
  });
  confirm.addEventListener('click', () => {
    pending = true;
    error.hidden = true;
    confirm.disabled = true;
    cancel.disabled = true;
    void Promise.resolve(options.onConfirm())
      .then(closeAfterSuccess)
      .catch((failure: unknown) => {
        pending = false;
        error.hidden = false;
        error.textContent = readableError(failure);
        confirm.disabled = false;
        cancel.disabled = false;
        confirm.focus();
      });
  });
  documentObject.addEventListener('keydown', onKeyDown);
  cancel.focus();
  return overlay;
}
