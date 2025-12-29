import { Answer } from '@/app/features/game/types/answer';
import { Question } from '@/app/features/game/types/question';
import { GameActions } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import {
  selectCorrectAnswerId,
  selectGameStatus,
  selectSubmittedAnswerId,
} from '@/app/store/selectors/game.selectors';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-game-play',
  imports: [ProgressBar, CommonModule],
  templateUrl: './game-play.html',
  styleUrl: './game-play.scss',
})
export class GamePlay {
  private readonly store = inject(Store);

  public readonly question = input.required<Question>();

  protected readonly submittedAnswerId = this.store.selectSignal(selectSubmittedAnswerId);
  protected readonly status = this.store.selectSignal(selectGameStatus);
  protected readonly correctAnswerId = this.store.selectSignal(selectCorrectAnswerId);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  public constructor() {
    effect((onCleanup) => {
      this.remainingTime.set(this.question().timeLimitSeconds);
      this.startTimer();

      onCleanup(() => this.clearTimer());
    });
  }

  private readonly totalTime = computed(() => this.question().timeLimitSeconds);
  protected readonly remainingTime = signal(0);
  protected readonly progressValue = computed(() => {
    const total = this.totalTime();
    const remaining = this.remainingTime();
    if (total <= 0) return 0;

    return Math.max(0, (remaining / total) * 100);
  });

  protected readonly isLocked = computed(() => {
    return this.remainingTime() <= 0 || this.submittedAnswerId();
  });

  protected answerClass(answerId: string): Record<string, boolean> {
    const hasReceivedCorrectAnswer = this.status() === GameStatus.ANSWER;
    const isSelected = this.submittedAnswerId() === answerId;

    return {
      'border-secondary': !hasReceivedCorrectAnswer && isSelected,
      '!bg-border-light':
        !hasReceivedCorrectAnswer && !isSelected && this.submittedAnswerId() !== null,
      'border-status-success': hasReceivedCorrectAnswer && this.isCorrectAnswer(answerId),
      'border-status-error': hasReceivedCorrectAnswer && !this.isCorrectAnswer(answerId),
    };
  }

  protected onAnswerSelect(answer: Answer): void {
    if (this.isLocked()) return;

    this.store.dispatch(
      GameActions.submitAnswer({ questionId: this.question().id, answerId: answer.id }),
    );
  }

  private isCorrectAnswer(answerId: string): boolean {
    const correctId = this.correctAnswerId();

    return !!correctId && answerId === correctId;
  }

  private startTimer(): void {
    this.clearTimer();

    this.intervalId = setInterval(() => {
      this.remainingTime.update((prev) => Math.max(0, prev - 1));

      if (this.remainingTime() === 0) {
        this.clearTimer();

        if (this.submittedAnswerId() !== null) return;

        this.store.dispatch(
          GameActions.submitAnswer({
            questionId: this.question().id,
            answerId: this.submittedAnswerId(),
          }),
        );
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
