import type { ProjectColors, ProjectStyle } from '../projects/model';

export interface ProjectCustomizationPatch {
  readonly style: ProjectStyle;
  readonly colors: ProjectColors;
  readonly progress?: number;
  readonly manualVersion?: string;
  readonly removeCover?: boolean;
}

export interface PreparedCover {
  readonly mimeType: 'image/webp';
  readonly base64: string;
  readonly width: 640;
  readonly height: 400;
}

export interface CustomizationRequest {
  readonly patch: ProjectCustomizationPatch;
  readonly cover?: PreparedCover;
}

export interface CustomizationPublicationResult {
  readonly pullRequestUrl: string;
  readonly branchName: string;
}

export type AdminSessionState =
  | { readonly status: 'loading' }
  | { readonly status: 'anonymous' }
  | { readonly status: 'authenticated'; readonly login: string }
  | { readonly status: 'error'; readonly message: string };
