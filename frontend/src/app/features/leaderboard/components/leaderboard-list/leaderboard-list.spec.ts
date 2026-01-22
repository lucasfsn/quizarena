import { LeaderboardsList } from '@/app/features/leaderboard/components/leaderboard-list/leaderboard-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LeaderboardList', () => {
  let component: LeaderboardsList;
  let fixture: ComponentFixture<LeaderboardsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardsList],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
