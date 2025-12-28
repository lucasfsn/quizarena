import { QuizzesList } from '@/app/features/quizzes/components/quizzes-list/quizzes-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizzesList', () => {
  let component: QuizzesList;
  let fixture: ComponentFixture<QuizzesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesList],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
