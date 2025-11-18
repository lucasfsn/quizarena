import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filters } from '@/app/features/quizzes/components/filters/filters';

describe('Filters', () => {
  let component: Filters;
  let fixture: ComponentFixture<Filters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filters],
    }).compileComponents();

    fixture = TestBed.createComponent(Filters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
