import { User } from '@/app/features/user/services/user/user';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';

export const userResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const userService = inject(User);

  return queryClient.prefetchQuery(userService.fetchLoggedInUserOptions());
};
