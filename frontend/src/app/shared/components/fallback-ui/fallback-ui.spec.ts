import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';

describe('FallbackUi', () => {
  let component: FallbackUi;
  let fixture: ComponentFixture<FallbackUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallbackUi],
    }).compileComponents();

    fixture = TestBed.createComponent(FallbackUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
