import { QuizzesFilters } from '@/app/features/quizzes/components/quizzes-filters/quizzes-filters';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('QuizzesFilters', () => {
  let component: QuizzesFilters;
  let fixture: ComponentFixture<QuizzesFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizzesFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
