import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOut } from '@/app/features/home/components/logged-out/logged-out';

describe('LoggedOut', () => {
  let component: LoggedOut;
  let fixture: ComponentFixture<LoggedOut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedOut],
    }).compileComponents();

    fixture = TestBed.createComponent(LoggedOut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
