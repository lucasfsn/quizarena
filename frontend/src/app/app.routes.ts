import { Home } from '@/app/features/home/home';
import { MainLayout } from '@/app/shared/layouts/main-layout/main-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Quizarena',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'quizzes',
        title: 'Browse Quizzes',
        loadComponent: () => import('@/app/features/quizzes/quizzes').then((m) => m.Quizzes),
      },
      { path: 'not-found', title: 'Page Not Found', loadComponent: () => import('@/app/features/not-found/not-found').then((m) => m.NotFound) },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
