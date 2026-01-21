import { Page } from '@/app/core/types/page';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';

export const MOCK_LEADERBOARD_PAGE: Page<LeaderboardEntry> = {
  content: [
    {
      id: '1',
      username: 'QuizMaster',
      score: 9850,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      unsorted: false,
      sorted: true,
      empty: false,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalPages: 5,
  totalElements: 47,
  last: false,
  numberOfElements: 10,
  first: true,
  size: 10,
  number: 0,
  sort: {
    unsorted: false,
    sorted: true,
    empty: false,
  },
  empty: false,
};
