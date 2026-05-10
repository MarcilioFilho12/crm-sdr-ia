import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/users-list.page').then((m) => m.UsersListPageComponent),
  },
];
