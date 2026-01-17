import { Question } from '@/app/features/game/types/question';
import { User } from '@/app/features/user/services/user/user';
import { GameActions } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
  selectCorrectAnswerId,
  selectGameStatus,
  selectScores,
  selectSubmittedAnswerId,
} from '@/app/store/selectors/game.selectors';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ProgressBar } from 'primeng/progressbar';
import { map, switchMap, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-game-play',
  imports: [ProgressBar],
  templateUrl: './game-play.html',
  styleUrl: './game-play.scss',
})
export class GamePlay {
  private readonly store = inject(Store);
  private readonly userService = inject(User);

  public readonly question = input.required<Question>();

  protected readonly submittedAnswerId = this.store.selectSignal(
    selectSubmittedAnswerId
  );
  protected readonly status = this.store.selectSignal(selectGameStatus);
  protected readonly correctAnswerId = this.store.selectSignal(
    selectCorrectAnswerId
  );
  protected readonly scores = this.store.selectSignal(selectScores);

  private readonly userQuery = injectQuery(() => ({
    ...this.userService.fetchLoggedInUserOptions(),
    select: (user) => user.id,
  }));

  protected readonly playerScore = computed(() => {
    const userId = this.userQuery.data();
    const foundScore = this.scores()?.find((score) => score.userId === userId);

    return {
      score: foundScore?.score ?? 0,
      correctAnswers: foundScore?.correctAnswers ?? 0,
    };
  });

  private readonly totalTime = computed(() => this.question().timeLimitSeconds);
  protected readonly progressValue = computed(() => {
    const total = this.totalTime();
    const remaining = this.remainingTime();
    if (total <= 0) return 0;

    return Math.max(0, (remaining / total) * 100);
  });
  public readonly remainingTime = toSignal(
    toObservable(this.question).pipe(
      switchMap((question) => {
        const startTime = new Date(question.startedAt).getTime();
        const endTime = startTime + question.timeLimitSeconds * 1000;

        return timer(0, 1000).pipe(
          map(() => {
            const now = Date.now();
            const remainingMs = endTime - now;

            return Math.ceil(remainingMs / 1000);
          }),
          map((seconds) => Math.max(0, seconds)),
          takeWhile((seconds) => seconds > 0, true)
        );
      })
    ),
    { initialValue: 0 }
  );

  protected readonly isLocked = computed(() => {
    return (
      this.status() === GameStatus.ANSWER ||
      this.remainingTime() <= 0 ||
      this.submittedAnswerId() !== null
    );
  });

  protected answerClasses(answerId: number): Record<string, boolean> {
    const hasReceivedCorrectAnswer = this.status() === GameStatus.ANSWER;
    const isSelected = this.submittedAnswerId() === answerId;

    return {
      'border-secondary': isSelected,
      '!bg-border-light':
        !isSelected &&
        ((this.status() === GameStatus.QUESTION &&
          this.submittedAnswerId() !== null) ||
          this.status() === GameStatus.ANSWER),
      'border-status-success':
        hasReceivedCorrectAnswer && this.isCorrectAnswer(answerId),
      'border-status-error':
        hasReceivedCorrectAnswer && !this.isCorrectAnswer(answerId),
    };
  }

  protected handleAnswerSelect(answerId: number): void {
    if (this.isLocked()) return;

    this.store.dispatch(
      GameActions.submitAnswer({
        answerId,
      })
    );
  }

  private isCorrectAnswer(answerId: number): boolean {
    const correctId = this.correctAnswerId();

    return answerId === correctId;
  }
}
