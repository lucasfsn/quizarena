import { HomeCard } from '@/app/features/home/components/home-card/home-card';
import { Button } from '@/app/shared/components/button/button';
import { FriendsIcon } from '@/app/shared/components/svg/friends-icon';
import { HomeQuestionImage } from '@/app/shared/components/svg/home-question-image';
import { KnowledgeIcon } from '@/app/shared/components/svg/knowledge-icon';
import { RankingIcon } from '@/app/shared/components/svg/ranking-icon';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-content',
  imports: [HomeQuestionImage, Button, HomeCard, KnowledgeIcon, FriendsIcon, RankingIcon],
  templateUrl: './home-content.html',
  styleUrl: './home-content.scss',
})
export class HomeContent {
  // Mock flag representing a logged-in user; replace with real auth logic later
  protected readonly isLoggedIn: boolean = false;
}
