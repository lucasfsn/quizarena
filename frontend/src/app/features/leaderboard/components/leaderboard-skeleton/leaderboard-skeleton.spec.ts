import { LeaderboardSkeleton } from '@/app/features/leaderboard/components/leaderboard-skeleton/leaderboard-skeleton';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LeaderboardSkeleton', () => {
  let component: LeaderboardSkeleton;
  let fixture: ComponentFixture<LeaderboardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
