import { LeaderboardItem } from '@/app/features/leaderboard/components/leaderboard-item/leaderboard-item';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('LeaderboardItem', () => {
  let component: LeaderboardItem;
  let fixture: ComponentFixture<LeaderboardItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardItem],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
