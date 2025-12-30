import { MOCK_GAME_DETAILS } from '@/app/dev/game-details';
import { MOCK_GAME_QUESTION } from '@/app/dev/game-question';
import { GameLobby } from '@/app/features/game/components/game-lobby/game-lobby';
import { GamePlay } from '@/app/features/game/components/game-play/game-play';
import { GameSummary } from '@/app/features/game/components/game-summary/game-summary';
import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { GameActions } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
  selectGameStatus,
  selectSummaryId,
} from '@/app/store/selectors/game.selectors';
import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-game',
  imports: [
    GamePlay,
    GameLobby,
    GameSummary,
    ProgressSpinner,
    FallbackUi,
    FetchErrorImage,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnDestroy, OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);

  protected readonly status = this.store.selectSignal(selectGameStatus);

  // protected readonly gameDetails = this.store.selectSignal(selectGameDetails);
  protected readonly gameDetails = signal<GameDetails>(MOCK_GAME_DETAILS);
  // protected readonly question = this.store.selectSignal(selectQuestion);
  protected readonly question = signal<Question>(MOCK_GAME_QUESTION);
  protected readonly summaryId = this.store.selectSignal(selectSummaryId);

  protected readonly GameStatus = GameStatus;

  public constructor() {
    effect(() => this.title.setTitle(this.gameDetails().quiz.title));
  }

  public ngOnInit(): void {
    const roomCode = this.route.snapshot.paramMap.get('roomCode');

    this.store
      .select(selectGameStatus)
      .pipe(take(1))
      .subscribe((status) => {
        if (status !== GameStatus.IDLE) return;

        if (roomCode) this.store.dispatch(GameActions.joinLobby({ roomCode }));
      });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(GameActions.leave());
  }
}
