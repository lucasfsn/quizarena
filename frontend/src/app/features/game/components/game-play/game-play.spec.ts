import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlay } from '@/app/features/game/components/game-play/game-play';

describe('GamePlay', () => {
  let component: GamePlay;
  let fixture: ComponentFixture<GamePlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlay],
    }).compileComponents();

    fixture = TestBed.createComponent(GamePlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
