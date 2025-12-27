import { TestBed } from '@angular/core/testing';
import { GameSocket } from '@/app/features/game/services/game-socket/game-socket';

describe('GameSocket', () => {
  let service: GameSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
