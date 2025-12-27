import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSkeleton } from '@/app/features/quizzes/components/quiz-skeleton/quiz-skeleton';

describe('QuizSkeleton', () => {
  let component: QuizSkeleton;
  let fixture: ComponentFixture<QuizSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
