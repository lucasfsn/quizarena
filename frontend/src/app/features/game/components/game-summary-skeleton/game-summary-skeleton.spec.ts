import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummarySkeleton } from '@/app/features/game/components/game-summary-skeleton/game-summary-skeleton';

describe('GameSummarySkeleton', () => {
  let component: GameSummarySkeleton;
  let fixture: ComponentFixture<GameSummarySkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSummarySkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(GameSummarySkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
