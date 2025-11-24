import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { quizzesResolver } from './quizzes-resolver';

describe('quizzesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => quizzesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
