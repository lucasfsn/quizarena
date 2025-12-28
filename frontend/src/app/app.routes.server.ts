import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'quizzes/new',
    renderMode: RenderMode.Client,
  },
  {
    path: 'quizzes',
    renderMode: RenderMode.Server,
  },
  { path: 'not-found', renderMode: RenderMode.Prerender },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
