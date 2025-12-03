import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSummary } from '@/app/features/game/components/game-summary/game-summary';

describe('GameSummary', () => {
  let component: GameSummary;
  let fixture: ComponentFixture<GameSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(GameSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
