export type AdminSessionState =
  | { readonly status: 'loading' }
  | { readonly status: 'anonymous' }
  | {
      readonly status: 'authenticated';
      readonly login: string;
      readonly admin: false;
      readonly githubAuthenticated: true;
    }
  | { readonly status: 'error'; readonly message: string };
