import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreateFormCategory } from '@/app/features/quizzes/components/quiz-create-form-category/quiz-create-form-category';

describe('QuizCreateFormCategory', () => {
  let component: QuizCreateFormCategory;
  let fixture: ComponentFixture<QuizCreateFormCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreateFormCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCreateFormCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
