import { QuizzesFiltersAuthor } from '@/app/features/quizzes/components/quizzes-filters-author/quizzes-filters-author';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizzesFiltersAuthor', () => {
  let component: QuizzesFiltersAuthor;
  let fixture: ComponentFixture<QuizzesFiltersAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesFiltersAuthor],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesFiltersAuthor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
