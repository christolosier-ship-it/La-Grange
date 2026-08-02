import {
  PROJECT_STYLES,
  projectStyleDefinition,
  resolveProjectColors,
  styleForCategory,
} from '../../core/customization/project-styles';
import type {
  CustomizationPublicationResult,
  CustomizationRequest,
  PreparedCover,
  ProjectCustomizationPatch,
} from '../../core/customization/types';
import type { Project, ProjectStyle } from '../../core/projects/model';

const DIALOG_SELECTOR = '[data-project-customization-dialog]';
const MAX_SOURCE_BYTES = 8 * 1024 * 1024;

function apiUrl(repositoryName: string): string {
  return new URL(
    `/api/projects/${encodeURIComponent(repositoryName)}/customization-pr`,
    window.location.origin,
  ).href;
}

function field(labelText: string, control: HTMLElement, hint?: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = 'customization-field';
  const title = document.createElement('span');
  title.textContent = labelText;
  label.append(title, control);
  if (hint) {
    const small = document.createElement('small');
    small.textContent = hint;
    label.append(small);
  }
  return label;
}

function colorInput(name: string, value: string): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'color';
  input.name = name;
  input.value = value;
  input.dataset.focusKey = `customization-${name}`;
  return input;
}

function optionalText(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Le fichier converti est illisible.'));
        return;
      }
      resolve(reader.result.split(',')[1] ?? '');
    }, { once: true });
    reader.addEventListener('error', () => {
      reject(new Error('Lecture de la couverture impossible.'));
    }, { once: true });
    reader.readAsDataURL(blob);
  });
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = 'async';
  image.src = url;
  try {
    await image.decode();
    return image;
  } catch {
    throw new Error('La couverture ne peut pas être décodée.');
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function prepareCover(file: File): Promise<PreparedCover> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new Error('Format non pris en charge. Utilisez PNG, JPEG ou WebP.');
  }
  if (file.size > MAX_SOURCE_BYTES) throw new Error('La couverture dépasse 8 Mo.');

  const image = await loadImage(file);
  const targetWidth = 640;
  const targetHeight = 400;
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = Math.round(image.naturalHeight * targetRatio);
    sourceX = Math.round((image.naturalWidth - sourceWidth) / 2);
  } else {
    sourceHeight = Math.round(image.naturalWidth / targetRatio);
    sourceY = Math.round((image.naturalHeight - sourceHeight) / 2);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Conversion de couverture indisponible.');
  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (value) resolve(value);
      else reject(new Error('Conversion WebP impossible.'));
    }, 'image/webp', 0.88);
  });
  if (blob.size > 220 * 1024) throw new Error('La couverture convertie dépasse 220 Ko.');
  return {
    mimeType: 'image/webp',
    base64: await toBase64(blob),
    width: 640,
    height: 400,
  };
}

function createPreview(project: Project): HTMLElement {
  const preview = document.createElement('article');
  preview.className = 'customization-preview';
  const marker = document.createElement('span');
  marker.className = 'customization-preview__style';
  marker.setAttribute('aria-hidden', 'true');
  const title = document.createElement('strong');
  title.textContent = project.displayName;
  const cover = document.createElement('div');
  cover.className = 'customization-preview__cover';
  if (project.cover) {
    const image = document.createElement('img');
    image.src = `${import.meta.env.BASE_URL}${project.cover.replace(/^\/+/, '')}`;
    image.alt = '';
    cover.append(image);
  } else {
    cover.textContent = project.displayName.split(/[\s_-]+/u).slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '').join('');
  }
  const version = document.createElement('span');
  version.className = 'customization-preview__version';
  version.textContent = project.resolvedVersion ?? 'Version automatique';
  const progress = document.createElement('div');
  progress.className = 'customization-preview__progress';
  const bar = document.createElement('span');
  progress.append(bar);
  preview.append(marker, title, cover, version, progress);
  return preview;
}

function updatePreview(
  preview: HTMLElement,
  style: ProjectStyle,
  primary: string,
  secondary: string,
  progressColor: string,
  progressValue: number | undefined,
  version: string | undefined,
): void {
  const definition = projectStyleDefinition(style);
  preview.style.setProperty('--preview-primary', primary);
  preview.style.setProperty('--preview-secondary', secondary);
  preview.style.setProperty('--preview-progress', progressColor);
  const styleMarker = preview.querySelector<HTMLElement>('.customization-preview__style');
  if (styleMarker) {
    styleMarker.textContent = definition.symbol;
    styleMarker.title = definition.label;
  }
  const versionNode = preview.querySelector<HTMLElement>('.customization-preview__version');
  if (versionNode) versionNode.textContent = version ?? 'Version automatique';
  const bar = preview.querySelector<HTMLElement>('.customization-preview__progress span');
  if (bar) bar.style.width = `${String(progressValue ?? 0)}%`;
  preview.classList.toggle('has-progress', progressValue !== undefined);
}

export function openProjectCustomization(project: Project): void {
  document.querySelector<HTMLDialogElement>(DIALOG_SELECTOR)?.close();

  const defaultStyle = project.style ?? styleForCategory(project.category);
  const defaultColors = resolveProjectColors(defaultStyle, project.colors, project.accent);
  const dialog = document.createElement('dialog');
  dialog.className = 'customization-dialog';
  dialog.dataset.projectCustomizationDialog = '';
  dialog.setAttribute('aria-labelledby', 'customization-title');

  const form = document.createElement('form');
  form.method = 'dialog';
  form.className = 'customization-form';

  const header = document.createElement('header');
  const heading = document.createElement('h2');
  heading.id = 'customization-title';
  heading.textContent = `Personnaliser ${project.displayName}`;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'customization-close';
  close.setAttribute('aria-label', 'Fermer la personnalisation');
  close.textContent = '×';
  close.addEventListener('click', () => {
    dialog.close();
  });
  header.append(heading, close);

  const preview = createPreview(project);
  const fields = document.createElement('div');
  fields.className = 'customization-fields';

  const style = document.createElement('select');
  style.name = 'style';
  style.dataset.focusKey = 'customization-style';
  for (const definition of PROJECT_STYLES) {
    const option = document.createElement('option');
    option.value = definition.key;
    option.textContent = definition.label;
    option.selected = definition.key === defaultStyle;
    style.append(option);
  }

  const primary = colorInput('primary', defaultColors.primary);
  const secondary = colorInput('secondary', defaultColors.secondary);
  const progressColor = colorInput('progressColor', defaultColors.progress);
  const progressEnabled = document.createElement('input');
  progressEnabled.type = 'checkbox';
  progressEnabled.name = 'progressEnabled';
  progressEnabled.checked = project.progress !== undefined;
  const progressValue = document.createElement('input');
  progressValue.type = 'number';
  progressValue.name = 'progress';
  progressValue.min = '0';
  progressValue.max = '100';
  progressValue.step = '1';
  progressValue.value = String(project.progress ?? 0);
  progressValue.disabled = !progressEnabled.checked;
  progressValue.dataset.focusKey = 'customization-progress';
  progressEnabled.addEventListener('change', () => {
    progressValue.disabled = !progressEnabled.checked;
    refreshPreview();
  });

  const version = document.createElement('input');
  version.type = 'text';
  version.name = 'manualVersion';
  version.maxLength = 40;
  version.value = project.manualVersion ?? '';
  version.placeholder = project.resolvedVersion ?? 'Dernière release GitHub';
  version.dataset.focusKey = 'customization-version';

  const cover = document.createElement('input');
  cover.type = 'file';
  cover.name = 'cover';
  cover.accept = 'image/png,image/jpeg,image/webp';
  cover.dataset.focusKey = 'customization-cover';
  const removeCover = document.createElement('input');
  removeCover.type = 'checkbox';
  removeCover.name = 'removeCover';

  fields.append(
    field('Style du projet', style),
    field('Couleur principale', primary),
    field('Couleur secondaire', secondary),
    field('Couleur de progression', progressColor),
    field('Afficher un avancement manuel', progressEnabled),
    field('Avancement, de 0 à 100', progressValue, 'Estimation éditoriale, jamais calculée depuis GitHub.'),
    field('Version manuelle', version, 'Laissez vide pour utiliser la dernière release GitHub.'),
    field('Nouvelle couverture', cover, 'PNG, JPEG ou WebP. Recadrage central automatique en 640 × 400.'),
    field('Retirer la couverture actuelle', removeCover),
  );

  const status = document.createElement('p');
  status.className = 'customization-status';
  status.setAttribute('aria-live', 'polite');

  const actions = document.createElement('footer');
  const cancel = document.createElement('button');
  cancel.type = 'button';
  cancel.textContent = 'Annuler';
  cancel.addEventListener('click', () => {
    dialog.close();
  });
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'is-primary';
  submit.textContent = 'Enregistrer et créer la PR';
  actions.append(cancel, submit);

  function refreshPreview(): void {
    const selectedStyle = style.value as ProjectStyle;
    const styleDefaults = projectStyleDefinition(selectedStyle).colors;
    if (document.activeElement === style) {
      primary.value = styleDefaults.primary;
      secondary.value = styleDefaults.secondary;
      progressColor.value = styleDefaults.progress;
    }
    updatePreview(
      preview,
      selectedStyle,
      primary.value,
      secondary.value,
      progressColor.value,
      progressEnabled.checked ? Number(progressValue.value) : undefined,
      version.value.trim() || project.resolvedVersion,
    );
  }

  for (const control of [style, primary, secondary, progressColor, progressValue, version]) {
    control.addEventListener('input', refreshPreview);
    control.addEventListener('change', refreshPreview);
  }
  refreshPreview();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void (async () => {
      submit.disabled = true;
      status.dataset.tone = 'neutral';
      status.textContent = 'Validation et préparation de la proposition…';
      try {
        const formData = new FormData(form);
        const progress = progressEnabled.checked ? Number(formData.get('progress')) : undefined;
        if (progress !== undefined && (!Number.isInteger(progress) || progress < 0 || progress > 100)) {
          throw new Error('L’avancement doit être un entier compris entre 0 et 100.');
        }
        const patch: ProjectCustomizationPatch = {
          style: style.value as ProjectStyle,
          colors: {
            primary: primary.value,
            secondary: secondary.value,
            progress: progressColor.value,
          },
          progress,
          manualVersion: optionalText(formData.get('manualVersion')),
          removeCover: removeCover.checked,
        };
        const selectedCover = cover.files?.[0];
        const request: CustomizationRequest = {
          patch,
          cover: selectedCover ? await prepareCover(selectedCover) : undefined,
        };
        status.textContent = 'Création de la branche, du commit et de la pull request…';
        const response = await fetch(apiUrl(project.repositoryName), {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-La-Grange-CSRF': '1',
          },
          body: JSON.stringify(request),
        });
        const result = await response.json() as Partial<CustomizationPublicationResult> & { message?: string };
        if (!response.ok || !result.pullRequestUrl || !result.branchName) {
          throw new Error(result.message ?? 'La pull request n’a pas pu être créée.');
        }
        status.dataset.tone = 'success';
        status.replaceChildren(document.createTextNode('Pull request créée : '));
        const link = document.createElement('a');
        link.href = result.pullRequestUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = result.branchName;
        status.append(link);
        submit.textContent = 'Proposition créée';
      } catch (error) {
        status.dataset.tone = 'danger';
        status.textContent = error instanceof Error ? error.message : 'Erreur de personnalisation.';
        submit.disabled = false;
      }
    })();
  });

  form.append(header, preview, fields, status, actions);
  dialog.append(form);
  dialog.addEventListener('close', () => {
    dialog.remove();
  }, { once: true });
  document.body.append(dialog);
  dialog.showModal();
  close.focus();
}
