import { authGuard } from '@/app/core/guards/auth-guard';
import { Home } from '@/app/features/home/home';
import { quizzesResolver } from '@/app/features/quizzes/resolvers/quizzes-resolver';
import { userResolver } from '@/app/features/user/resolvers/user-resolver';
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
        component: Home,
      },
      {
        path: 'quizzes',
        children: [
          {
            path: '',
            title: 'Browse Quizzes',
            resolve: { quizzesResolver },
            loadComponent: () =>
              import('@/app/features/quizzes/pages/quizzes/quizzes').then(
                (m) => m.Quizzes
              ),
          },
          {
            path: 'new',
            title: 'Create New Quiz',
            loadComponent: () =>
              import(
                '@/app/features/quizzes/pages/quiz-create/quiz-create'
              ).then((m) => m.QuizCreate),
            canActivate: [authGuard],
          },
        ],
      },
      {
        path: 'game/:roomCode',
        title: 'Game',
        resolve: { userResolver },
        loadComponent: () =>
          import('@/app/features/game/pages/game/game').then((m) => m.Game),
        canActivate: [authGuard],
      },
      {
        path: 'settings',
        title: 'Settings',
        resolve: { userResolver },
        loadComponent: () =>
          import('@/app/features/user/pages/settings/settings').then(
            (m) => m.Settings
          ),
        canActivate: [authGuard],
      },
      {
        path: 'not-found',
        title: 'Page Not Found',
        loadComponent: () =>
          import('@/app/features/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
