import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesQuizItem } from '@/app/features/quizzes/components/quizzes-quiz-item/quizzes-quiz-item';

describe('Quiz', () => {
  let component: QuizzesQuizItem;
  let fixture: ComponentFixture<QuizzesQuizItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesQuizItem],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesQuizItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
