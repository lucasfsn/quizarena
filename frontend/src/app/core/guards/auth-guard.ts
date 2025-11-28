import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData,
): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const { authenticated, grantedRoles } = authData;

  if (!authenticated) return router.createUrlTree(['/']);

  const requiredRole = route.data['role'];

  if (!requiredRole) return true;

  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

  if (hasRequiredRole(requiredRole)) return true;

  return router.createUrlTree(['/']);
};

export const authGuard = createAuthGuard<CanActivateFn>(isAccessAllowed);
