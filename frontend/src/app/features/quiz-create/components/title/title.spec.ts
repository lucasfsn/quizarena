import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title } from '@/app/features/quiz-create/components/title/title';

describe('Title', () => {
  let component: Title;
  let fixture: ComponentFixture<Title>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Title]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Title);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
