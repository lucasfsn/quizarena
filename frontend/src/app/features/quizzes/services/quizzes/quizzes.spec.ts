import { TestBed } from '@angular/core/testing';

import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';

describe('Quizzes', () => {
  let service: Quizzes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quizzes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
