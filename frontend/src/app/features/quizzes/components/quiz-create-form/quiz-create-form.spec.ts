import { QuizCreateForm } from '@/app/features/quizzes/components/quiz-create-form/quiz-create-form';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizCreateForm', () => {
  let component: QuizCreateForm;
  let fixture: ComponentFixture<QuizCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizCreateForm],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCreateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
