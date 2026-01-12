import { GameLobby } from '@/app/features/game/components/game-lobby/game-lobby';
import { GamePlay } from '@/app/features/game/components/game-play/game-play';
import { GameSummary } from '@/app/features/game/components/game-summary/game-summary';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { GameActions } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
    selectGameDetails,
    selectGameStatus,
    selectQuestion,
    selectSummaryId,
} from '@/app/store/selectors/game.selectors';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
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
  private readonly titleService = inject(Title);

  protected readonly status = this.store.selectSignal(selectGameStatus);
  protected readonly gameDetails = this.store.selectSignal(selectGameDetails);
  protected readonly question = this.store.selectSignal(selectQuestion);
  protected readonly summaryId = this.store.selectSignal(selectSummaryId);

  protected readonly GameStatus = GameStatus;

  public constructor() {
    effect(() => {
      const gameDetails = this.gameDetails();
      if (gameDetails) this.titleService.setTitle(gameDetails.quiz.title);
    });
  }

  public ngOnInit(): void {
    const roomCode = this.route.snapshot.paramMap.get('roomCode');

    this.store
      .select(selectGameStatus)
      .pipe(take(1))
      .subscribe((status) => {
        if (status === GameStatus.IDLE && roomCode)
          this.store.dispatch(GameActions.getGameSession({ roomCode }));
      });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(GameActions.leave());
  }
}
