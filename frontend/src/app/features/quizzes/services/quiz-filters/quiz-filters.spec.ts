import { TestBed } from '@angular/core/testing';

import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';

describe('QuizFilters', () => {
  let service: QuizFilters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizFilters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
