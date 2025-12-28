import { QuizzesFiltersCategory } from '@/app/features/quizzes/components/quizzes-filters-category/quizzes-filters-category';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizzesFiltersCategory', () => {
  let component: QuizzesFiltersCategory;
  let fixture: ComponentFixture<QuizzesFiltersCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesFiltersCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesFiltersCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
