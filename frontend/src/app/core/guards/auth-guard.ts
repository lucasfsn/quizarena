import { User } from '@/app/features/user/services/user/user';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const queryClient = inject(QueryClient);
  const userService = inject(User);

  const { authenticated, grantedRoles } = authData;

  if (!authenticated) return router.createUrlTree(['/']);

  try {
    await queryClient.ensureQueryData(userService.userOptions());
  } catch (error) {
    console.error(error);

    return router.createUrlTree(['/not-found']);
  }

  const requiredRole = route.data['role'];

  if (!requiredRole) return true;

  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) =>
      roles.includes(role)
    );

  if (hasRequiredRole(requiredRole)) return true;

  return router.createUrlTree(['/']);
};

export const authGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
