import { Leaderboard } from '@/app/features/leaderboard/services/leaderboard';
import { TestBed } from '@angular/core/testing';

describe('Leaderboard', () => {
  let service: Leaderboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Leaderboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
