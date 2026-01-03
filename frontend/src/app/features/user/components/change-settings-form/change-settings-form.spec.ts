import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSettingsForm } from '@/app/features/user/components/change-settings-form/change-settings-form';

describe('ChangeSettingsForm', () => {
  let component: ChangeSettingsForm;
  let fixture: ComponentFixture<ChangeSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeSettingsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeSettingsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
