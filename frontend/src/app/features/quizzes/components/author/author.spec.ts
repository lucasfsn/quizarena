import { Author } from '@/app/features/quizzes/components/author/author';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Author', () => {
  let component: Author;
  let fixture: ComponentFixture<Author>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Author],
    }).compileComponents();

    fixture = TestBed.createComponent(Author);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
