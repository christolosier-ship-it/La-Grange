import { resolveRepositoryVersion } from './release-resolver';

function repositoryName(githubUrl: string): string | undefined {
  try {
    const parts = new URL(githubUrl).pathname.split('/').filter(Boolean);
    return parts.length === 2 ? parts[1] : undefined;
  } catch {
    return undefined;
  }
}

function hydrateCard(card: HTMLElement): void {
  if (card.dataset.versionRequested === 'true' || card.querySelector('.project-card__version')) return;
  const github = card.querySelector<HTMLAnchorElement>('.project-card__action[href*="github.com"]');
  const visual = card.querySelector<HTMLElement>('.project-card__visual');
  if (!github || !visual) return;
  const name = repositoryName(github.href);
  if (!name) return;
  card.dataset.versionRequested = 'true';
  void resolveRepositoryVersion(name, github.href).then((version) => {
    if (!version || !card.isConnected || visual.querySelector('.project-card__version')) return;
    const badge = document.createElement('span');
    badge.className = 'project-card__version';
    badge.textContent = version;
    badge.setAttribute('aria-label', `Version ${version}`);
    visual.append(badge);
  });
}

function scan(root: ParentNode): void {
  if (root instanceof HTMLElement && root.matches('.project-card')) hydrateCard(root);
  root.querySelectorAll<HTMLElement>('.project-card').forEach(hydrateCard);
}

export function installReleaseBadges(root: ParentNode = document): () => void {
  scan(root);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) scan(node);
      });
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  return () => observer.disconnect();
}
