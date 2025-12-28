import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizzesResolver } from '@/app/features/quizzes/resolvers/quizzes-resolver';

describe('quizzesResolver', () => {
  const executeResolver: ResolveFn<void> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => quizzesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
