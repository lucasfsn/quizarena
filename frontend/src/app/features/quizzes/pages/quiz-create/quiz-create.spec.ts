import { QuizCreateFormTitle } from '@/app/features/quizzes/components/quiz-create-form-title/quiz-create-form-title';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizCreateFormTitle', () => {
  let component: QuizCreateFormTitle;
  let fixture: ComponentFixture<QuizCreateFormTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreateFormTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCreateFormTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
