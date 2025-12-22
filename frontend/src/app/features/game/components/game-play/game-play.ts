import { MOCK_GAME_QUESTION } from '@/app/dev/game-question';
import { Answer } from '@/app/features/game/types/answer';
import { Question } from '@/app/features/game/types/question';
import { answerSelected, submitAnswer } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
  selectAnswerResults,
  selectGameStatus,
  selectHasSubmitted,
  selectSelectedAnswerId,
} from '@/app/store/selectors/game.selectors';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-game-play',
  imports: [ProgressBar],
  templateUrl: './game-play.html',
  styleUrl: './game-play.scss',
})
export class GamePlay {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  protected readonly question = signal<Question>(MOCK_GAME_QUESTION);

  protected readonly selectedAnswerId = this.store.selectSignal(selectSelectedAnswerId);
  protected readonly hasSubmitted = this.store.selectSignal(selectHasSubmitted);
  protected readonly status = this.store.selectSignal(selectGameStatus);
  protected readonly results = this.store.selectSignal(selectAnswerResults);

  private readonly totalTime = computed(() => this.question().timeLimitSeconds);
  protected readonly remainingTime = signal(this.question().timeLimitSeconds);
  protected readonly progressValue = computed(() => {
    const total = this.totalTime();
    const remaining = this.remainingTime();
    if (total <= 0) return 0;

    return Math.max(0, (remaining / total) * 100);
  });
  private intervalId: ReturnType<typeof setInterval> | undefined;

  protected readonly isLocked = computed(() => {
    return (
      this.remainingTime() <= 0 || this.hasSubmitted()
      // || this.status() !== GameStatus.QUESTION
    );
  });

  protected readonly hasResults = computed(() => this.status() === GameStatus.ANSWER);

  protected isSelected(answerId: string): boolean {
    return this.selectedAnswerId() === answerId;
  }

  protected isCorrectAnswer(answerId: string): boolean {
    const correctId = this.results()?.correctAnswerId;

    return !!correctId && answerId === correctId;
  }

  protected isMyWrongAnswer(answerId: string): boolean {
    const correctId = this.results()?.correctAnswerId;
    const selectedId = this.selectedAnswerId();

    return !!correctId && !!selectedId && selectedId === answerId && selectedId !== correctId;
  }

  public constructor() {
    this.intervalId = setInterval(() => {
      const next = this.remainingTime() - 1;
      this.remainingTime.set(next);

      if (next <= 0) {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = undefined;
        }

        if (!this.hasSubmitted()) {
          this.store.dispatch(submitAnswer({ answerId: this.selectedAnswerId() }));
        }
      }
    }, 1000);

    this.destroyRef.onDestroy(() => {
      if (this.intervalId) clearInterval(this.intervalId);
    });
  }

  protected onAnswerSelect(answer: Answer): void {
    if (this.isLocked()) return;

    this.store.dispatch(answerSelected({ answerId: answer.id }));
  }
}
