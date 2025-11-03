import { NotFound } from '@/app/features/not-found/not-found';
import { MainLayout } from '@/app/shared/layouts/main-layout/main-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'not-found', component: NotFound },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
