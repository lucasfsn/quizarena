import { Authorization } from '@/app/core/auth/authorization';
import { HomeCard } from '@/app/features/home/components/home-card/home-card';
import { JOIN_GAME_FORM_CONSTRAINTS } from '@/app/features/home/constants/join-game-form-consts';
import { JoinGameFormConsts } from '@/app/features/home/types/join-game-form-consts';
import { Button } from '@/app/shared/components/button/button';
import { FriendsIcon } from '@/app/shared/components/svg/friends-icon';
import { HomeQuestionImage } from '@/app/shared/components/svg/home-question-image';
import { KnowledgeIcon } from '@/app/shared/components/svg/knowledge-icon';
import { RankingIcon } from '@/app/shared/components/svg/ranking-icon';
import { GameActions } from '@/app/store/actions/game.actions';
import { selectError } from '@/app/store/selectors/game.selectors';
import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumber } from 'primeng/inputnumber';

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
    InputNumber,
    ReactiveFormsModule,
    FloatLabel,
  ],
  templateUrl: './home-content.html',
  styleUrl: './home-content.scss',
})
export class HomeContent {
  private readonly authorizationService = inject(Authorization);
  private readonly store = inject(Store);

  protected readonly limits: JoinGameFormConsts = JOIN_GAME_FORM_CONSTRAINTS;

  protected isLoggedIn = computed(() => this.authorizationService.isLoggedIn());
  protected isKeycloakReady = computed(() =>
    this.authorizationService.isReady()
  );

  protected readonly error = this.store.selectSignal(selectError);

  protected joinQuizDialogVisible: boolean = false;

  protected roomControl = new FormControl<number | null>(null, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(this.limits.MIN),
      Validators.max(this.limits.MAX),
    ],
  });

  protected handleShowJoinQuizDialog(): void {
    if (!this.isLoggedIn()) {
      this.authorizationService.login();

      return;
    }

    this.store.dispatch(GameActions.reset());
    this.roomControl.reset(null);

    this.joinQuizDialogVisible = true;
  }

  protected handleEnterQuizByCodeClick(): void {
    const code = this.roomControl.value;
    if (!code) return;

    this.store.dispatch(GameActions.joinLobby({ roomCode: code.toString() }));
  }
}
