import { Home } from '@/app/features/home/home';
import { NotFound } from '@/app/features/not-found/not-found';
import { Quizzes } from '@/app/features/quizzes/quizzes';
import { MainLayout } from '@/app/shared/layouts/main-layout/main-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Quizarena',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'quizzes',
        component: Quizzes,
        title: 'Browse Quizzes',
      },
      { path: 'not-found', title: 'Page Not Found', component: NotFound },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
