import { Toast } from '@/app/shared/services/toast/toast';
import { TestBed } from '@angular/core/testing';

describe('Toast', () => {
  let service: Toast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
