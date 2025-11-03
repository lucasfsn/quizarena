import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  { path: 'not-found', renderMode: RenderMode.Prerender },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
