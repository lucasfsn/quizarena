import { Authorization } from '@/app/core/auth/authorization';
import { HomeCard } from '@/app/features/home/components/home-card/home-card';
import { Button } from '@/app/shared/components/button/button';
import { FriendsIcon } from '@/app/shared/components/svg/friends-icon';
import { HomeQuestionImage } from '@/app/shared/components/svg/home-question-image';
import { KnowledgeIcon } from '@/app/shared/components/svg/knowledge-icon';
import { RankingIcon } from '@/app/shared/components/svg/ranking-icon';
import { GameActions } from '@/app/store/actions/game.actions';
import { selectError } from '@/app/store/selectors/game.selectors';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-home-content',
  imports: [
    HomeQuestionImage,
    Button,
    HomeCard,
    KnowledgeIcon,
    FriendsIcon,
    RankingIcon,
    DialogModule,
    InputText,
    ReactiveFormsModule,
    FloatLabel,
  ],
  templateUrl: './home-content.html',
  styleUrl: './home-content.scss',
})
export class HomeContent {
  private readonly authorizationService = inject(Authorization);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  protected readonly error = this.store.selectSignal(selectError);

  protected joinQuizDialogVisible: boolean = false;

  protected roomControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(/^[a-zA-Z0-9]*$/),
    ],
  });

  protected handleShowJoinQuizDialog(): void {
    if (!this.isLoggedIn()) {
      this.authorizationService.login();

      return;
    }

    this.store.dispatch(GameActions.reset());
    this.roomControl.reset('');

    this.joinQuizDialogVisible = true;
  }

  protected handleEnterQuizByCodeClick(): void {
    const code = this.roomControl.value;
    if (!code) return;

    this.store.dispatch(
      GameActions.joinLobby({ roomCode: code.toUpperCase() })
    );
  }
}
