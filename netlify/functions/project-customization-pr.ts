import { randomBytes } from 'node:crypto';
import {
  repositorySlug,
  validateRepositoryName,
  validateRequest,
} from './_shared/customization-validation';
import { githubRequest, targetRepository } from './_shared/github-app';
import { allowedAdmin, readSession, validWriteOrigin } from './_shared/session';

export const config = { path: '/api/projects/:repositoryName/customization-pr' };

interface GitRef { readonly object: { readonly sha: string } }
interface GitCommit { readonly tree: { readonly sha: string } }
interface GitContent { readonly content: string; readonly encoding: string; readonly sha: string }
interface GitBlob { readonly sha: string }
interface GitTree { readonly sha: string }
interface CreatedCommit { readonly sha: string }
interface PullRequest { readonly html_url: string }

interface OverrideDocument {
  schemaVersion: 3;
  projects: Record<string, Record<string, unknown>>;
}

function response(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function repositoryNameFromRequest(request: Request): string {
  const match = new URL(request.url).pathname.match(/^\/api\/projects\/([^/]+)\/customization-pr$/u);
  if (!match?.[1]) throw new Error('Route de personnalisation invalide.');
  return validateRepositoryName(decodeURIComponent(match[1]));
}

function normalizeOverrides(value: unknown): OverrideDocument {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { schemaVersion: 3, projects: {} };
  }
  const raw = value as Record<string, unknown>;
  if (raw.schemaVersion === 3 && raw.projects && typeof raw.projects === 'object' && !Array.isArray(raw.projects)) {
    return { schemaVersion: 3, projects: raw.projects as Record<string, Record<string, unknown>> };
  }
  return { schemaVersion: 3, projects: raw as Record<string, Record<string, unknown>> };
}

function decodeContent(content: GitContent): unknown {
  if (content.encoding !== 'base64') throw new Error('Encodage des overrides inattendu.');
  return JSON.parse(Buffer.from(content.content.replace(/\s/gu, ''), 'base64').toString('utf8')) as unknown;
}

function branchName(slug: string): string {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/gu, '').slice(0, 14);
  return `customization/${slug}-${stamp}-${randomBytes(3).toString('hex')}`;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return response(405, { message: 'Méthode non autorisée.' });
  if (!validWriteOrigin(request)) return response(403, { message: 'Origine ou jeton CSRF invalide.' });
  const session = readSession(request);
  if (!session || !allowedAdmin(session.login)) return response(401, { message: 'Session administrateur requise.' });

  try {
    const repositoryName = repositoryNameFromRequest(request);
    const slug = repositorySlug(repositoryName);
    const payload = validateRequest(await request.json());
    const { owner, repo } = targetRepository();
    const repositoryPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
    const mainRef = await githubRequest<GitRef>(`${repositoryPath}/git/ref/heads/main`);
    const baseSha = mainRef.object.sha;
    const baseCommit = await githubRequest<GitCommit>(`${repositoryPath}/git/commits/${baseSha}`);
    const overridePath = 'public/data/project-overrides.json';
    const currentContent = await githubRequest<GitContent>(
      `${repositoryPath}/contents/${overridePath}?ref=${encodeURIComponent(baseSha)}`,
    );
    const document = normalizeOverrides(decodeContent(currentContent));
    const current = document.projects[repositoryName] ?? {};
    const next: Record<string, unknown> = {
      ...current,
      style: payload.patch.style,
      colors: payload.patch.colors,
    };

    if (payload.patch.progress === undefined) delete next.progress;
    else next.progress = payload.patch.progress;
    if (payload.patch.manualVersion === undefined) delete next.manualVersion;
    else next.manualVersion = payload.patch.manualVersion;

    const previousCover = typeof current.cover === 'string' ? current.cover : undefined;
    const coverRelativePath = `assets/phase-6/covers/${slug}-cover-640x400.webp`;
    if (payload.cover) next.cover = coverRelativePath;
    else if (payload.patch.removeCover) delete next.cover;
    document.projects[repositoryName] = next;

    const overridesBlob = await githubRequest<GitBlob>(`${repositoryPath}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({
        content: `${JSON.stringify(document, null, 2)}\n`,
        encoding: 'utf-8',
      }),
    });

    const tree: Array<Record<string, unknown>> = [{
      path: overridePath,
      mode: '100644',
      type: 'blob',
      sha: overridesBlob.sha,
    }];

    if (payload.cover) {
      const coverBlob = await githubRequest<GitBlob>(`${repositoryPath}/git/blobs`, {
        method: 'POST',
        body: JSON.stringify({ content: payload.cover.bytes.toString('base64'), encoding: 'base64' }),
      });
      tree.push({
        path: `public/${coverRelativePath}`,
        mode: '100644',
        type: 'blob',
        sha: coverBlob.sha,
      });
    } else if (payload.patch.removeCover
      && previousCover?.startsWith('assets/phase-6/covers/')) {
      tree.push({ path: `public/${previousCover}`, mode: '100644', type: 'blob', sha: null });
    }

    const createdTree = await githubRequest<GitTree>(`${repositoryPath}/git/trees`, {
      method: 'POST',
      body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }),
    });
    const commit = await githubRequest<CreatedCommit>(`${repositoryPath}/git/commits`, {
      method: 'POST',
      body: JSON.stringify({
        message: `chore: personnaliser ${repositoryName}`,
        tree: createdTree.sha,
        parents: [baseSha],
      }),
    });

    const latestMain = await githubRequest<GitRef>(`${repositoryPath}/git/ref/heads/main`);
    if (latestMain.object.sha !== baseSha) {
      return response(409, { message: 'La branche main a évolué. Rechargez La Grange puis recommencez.' });
    }

    const branch = branchName(slug);
    await githubRequest(`${repositoryPath}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: commit.sha }),
    });
    const pullRequest = await githubRequest<PullRequest>(`${repositoryPath}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title: `Personnaliser ${repositoryName}`,
        head: branch,
        base: 'main',
        body: [
          '## Personnalisation La Grange',
          '',
          `Projet : \`${repositoryName}\``,
          `Demandée depuis La Grange par \`${session.login}\`.`,
          '',
          '- style et palette ;',
          '- avancement et version manuels éventuels ;',
          '- couverture WebP 640 × 400 éventuelle.',
          '',
          'Fusion manuelle requise.',
        ].join('\n'),
        maintainer_can_modify: false,
      }),
    });

    return response(201, { pullRequestUrl: pullRequest.html_url, branchName: branch });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Personnalisation impossible.';
    const clientError = /invalide|interdit|doit|dépasse|pris en charge/iu.test(message);
    return response(clientError ? 400 : 502, { message });
  }
}
