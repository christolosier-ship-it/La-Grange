import type { Project } from '../../core/projects/model';

const DIALOG_SELECTOR = '[data-project-customization-dialog]';
const OVERRIDES_URL = 'https://github.com/christolosier-ship-it/La-Grange/blob/main/public/data/project-overrides.json';

export function openProjectCustomization(project: Project): void {
  document.querySelector<HTMLDialogElement>(DIALOG_SELECTOR)?.close();

  const dialog = document.createElement('dialog');
  dialog.className = 'github-connection-dialog';
  dialog.dataset.projectCustomizationDialog = '';
  dialog.setAttribute('aria-labelledby', 'customization-title');

  const container = document.createElement('div');
  container.className = 'github-connection-form';

  const heading = document.createElement('h2');
  heading.id = 'customization-title';
  heading.textContent = `Personnaliser ${project.displayName}`;

  const explanation = document.createElement('p');
  explanation.textContent = 'La Grange est hébergée uniquement sur GitHub Pages. Une page statique ne peut pas créer une pull request de façon sécurisée sans exposer un jeton d’écriture.';

  const consequence = document.createElement('p');
  consequence.textContent = 'La personnalisation automatique est donc désactivée. Les styles, couleurs, versions et couvertures restent versionnés dans le dépôt La-Grange et peuvent être modifiés directement sur GitHub.';

  const link = document.createElement('a');
  link.className = 'github-connection-link';
  link.href = OVERRIDES_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Ouvrir project-overrides.json sur GitHub';

  const actions = document.createElement('div');
  actions.className = 'github-connection-actions';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'is-primary';
  close.textContent = 'Fermer';
  close.addEventListener('click', () => {
    dialog.close();
  });
  actions.append(close);

  container.append(heading, explanation, consequence, link, actions);
  dialog.append(container);
  dialog.addEventListener('close', () => {
    dialog.remove();
  }, { once: true });
  document.body.append(dialog);
  dialog.showModal();
  close.focus();
}
