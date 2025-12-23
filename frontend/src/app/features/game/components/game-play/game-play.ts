import { MOCK_GAME_QUESTION } from '@/app/dev/game-question';
import { Answer } from '@/app/features/game/types/answer';
import { Question } from '@/app/features/game/types/question';
import { answerSelected, submitAnswer } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
  selectCorrectAnswerId,
  selectGameStatus,
  selectHasSubmitted,
  selectSelectedAnswerId,
} from '@/app/store/selectors/game.selectors';
import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-game-play',
  imports: [ProgressBar, CommonModule],
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
  protected readonly correctAnswerId = this.store.selectSignal(selectCorrectAnswerId);

  public constructor() {
    const intervalId = setInterval(() => {
      this.remainingTime.update((prev) => Math.max(0, prev - 1));

      if (this.remainingTime() === 0) {
        clearInterval(intervalId);

        if (!this.hasSubmitted())
          this.store.dispatch(submitAnswer({ answerId: this.selectedAnswerId() }));
      }
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  private readonly totalTime = computed(() => this.question().timeLimitSeconds);
  protected readonly remainingTime = signal(this.question().timeLimitSeconds);
  protected readonly progressValue = computed(() => {
    const total = this.totalTime();
    const remaining = this.remainingTime();
    if (total <= 0) return 0;

    return Math.max(0, (remaining / total) * 100);
  });

  protected readonly isLocked = computed(() => {
    return (
      this.remainingTime() <= 0 || this.selectedAnswerId() !== null || this.hasSubmitted()
      // || this.status() !== GameStatus.QUESTION
    );
  });

  protected answerClass(answerId: string): Record<string, boolean> {
    const hasReceivedCorrectAnswer = this.status() === GameStatus.ANSWER;
    const isSelected = this.selectedAnswerId() === answerId;

    return {
      'border-secondary': !hasReceivedCorrectAnswer && isSelected,
      '!bg-border-light':
        !hasReceivedCorrectAnswer && !isSelected && this.selectedAnswerId() !== null,
      'border-status-success': hasReceivedCorrectAnswer && this.isCorrectAnswer(answerId),
      'border-status-error': hasReceivedCorrectAnswer && !this.isCorrectAnswer(answerId),
    };
  }

  protected onAnswerSelect(answer: Answer): void {
    if (this.isLocked()) return;

    this.store.dispatch(answerSelected({ answerId: answer.id }));
  }

  private isCorrectAnswer(answerId: string): boolean {
    const correctId = this.correctAnswerId();

    return !!correctId && answerId === correctId;
  }
}
