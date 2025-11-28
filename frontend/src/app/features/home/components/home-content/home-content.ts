import { Authorization } from '@/app/core/auth/authorization';
import { HomeCard } from '@/app/features/home/components/home-card/home-card';
import { Button } from '@/app/shared/components/button/button';
import { FriendsIcon } from '@/app/shared/components/svg/friends-icon';
import { HomeQuestionImage } from '@/app/shared/components/svg/home-question-image';
import { KnowledgeIcon } from '@/app/shared/components/svg/knowledge-icon';
import { RankingIcon } from '@/app/shared/components/svg/ranking-icon';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-content',
  imports: [HomeQuestionImage, Button, HomeCard, KnowledgeIcon, FriendsIcon, RankingIcon],
  templateUrl: './home-content.html',
  styleUrl: './home-content.scss',
})
export class HomeContent {
  private authorizationService = inject(Authorization);
  private router = inject(Router);

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  protected handleLeftButtonClick(): void {
    if (this.isLoggedIn()) this.router.navigate(['/quizzes/new']);
    else this.authorizationService.login();
  }
}
