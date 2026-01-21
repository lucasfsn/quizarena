import { Authorization } from '@/app/core/auth/authorization';
import { Response } from '@/app/core/types/response';
import { getMockUser } from '@/app/dev/get-mock-user';
import { CURRENT_USER_QUERY_KEY } from '@/app/features/user/constants/current-user-query-key';
import { getUserQueryKey } from '@/app/features/user/queries/get-user-query-key';
import { UserDetails } from '@/app/features/user/types/user-details';
import { UserUpdatePayload } from '@/app/features/user/types/user-update-payload';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateQueryOptions,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly http = inject(HttpClient);
  private readonly authorizationService = inject(Authorization);

  private useMock = true;

  public fetchLoggedInUserOptions(): CreateQueryOptions<
    UserDetails,
    Error,
    UserDetails,
    ReturnType<typeof getUserQueryKey>
  > {
    return queryOptions({
      queryKey: getUserQueryKey(CURRENT_USER_QUERY_KEY),
      queryFn: () => lastValueFrom(this.getLoggedInUser()),
      enabled: this.authorizationService.isLoggedIn(),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  }

  private getLoggedInUser(): Observable<UserDetails> {
    if (this.useMock) return getMockUser();

    return this.http
      .get<Response<UserDetails>>(`${environment.apiUrl}/user`)
      .pipe(map((res: Response<UserDetails>) => res.data));
  }

  public changeSettings(payload: UserUpdatePayload): Observable<UserDetails> {
    if (this.useMock)
      return getMockUser().pipe(
        map((user) => ({
          ...user,
          ...payload,
        }))
      );

    return this.http
      .patch<Response<UserDetails>>(`${environment.apiUrl}/user`, payload)
      .pipe(map((res: Response<UserDetails>) => res.data));
  }
}
