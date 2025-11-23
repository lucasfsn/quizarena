import { QuizCreateFormQuestion } from '@/app/features/quizzes/components/quiz-create-form-question/quiz-create-form-question';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizCreateFormQuestion', () => {
  let component: QuizCreateFormQuestion;
  let fixture: ComponentFixture<QuizCreateFormQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreateFormQuestion],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCreateFormQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
