import { UserDetails } from '@/app/features/user/types/user-details';
import { delay, Observable, of } from 'rxjs';

export function getMockUser(): Observable<UserDetails> {
  return of({
    id: '123',
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
  }).pipe(delay(1000));
}
