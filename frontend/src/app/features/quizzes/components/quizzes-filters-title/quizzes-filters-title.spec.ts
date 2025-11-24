import { QuizzesFiltersTitle } from '@/app/features/quizzes/components/quizzes-filters-title/quizzes-filters-title';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizzesFiltersTitle', () => {
  let component: QuizzesFiltersTitle;
  let fixture: ComponentFixture<QuizzesFiltersTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesFiltersTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesFiltersTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
