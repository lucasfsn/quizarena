import { Page } from '@/app/core/types/page';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { delay, Observable, of } from 'rxjs';

export function getMockLeaderboard(
  page: number,
  pageSize: number
): Observable<Page<LeaderboardEntry>> {
  const allEntries: LeaderboardEntry[] = [
    { id: '1', username: 'QuizMaster', score: 9850 },
    { id: '2', username: 'Brainiac', score: 9200 },
    { id: '3', username: 'TriviaKing', score: 8900 },
    {
      id: '86ff2256-9fd2-4e66-9ccb-7773967ce75b',
      username: 'HistoryBuff',
      score: 8750,
    },
    { id: '5', username: 'ScienceGuy', score: 8500 },
    { id: '6', username: 'ArtLover', score: 8200 },
    { id: '7', username: 'MathWhiz', score: 8100 },
    { id: '8', username: 'GeoExplorer', score: 7950 },
    { id: '9', username: 'MusicFan', score: 7800 },
    { id: '10', username: 'Sporty', score: 7600 },
    { id: '11', username: 'NextGen', score: 7500 },
    { id: '12', username: 'OldSchool', score: 7400 },
  ];

  const start = page * pageSize;
  const end = start + pageSize;
  const content = allEntries.slice(start, end);
  const totalElements = allEntries.length;
  const totalPages = Math.ceil(totalElements / pageSize);

  const mockPage: Page<LeaderboardEntry> = {
    content,
    pageable: {
      pageNumber: page,
      pageSize,
      sort: { unsorted: false, sorted: true, empty: false },
      offset: start,
      unpaged: false,
      paged: true,
    },
    totalPages,
    totalElements,
    last: page >= totalPages - 1,
    numberOfElements: content.length,
    first: page === 0,
    size: pageSize,
    number: page,
    sort: {
      unsorted: false,
      sorted: true,
      empty: false,
    },
    empty: content.length === 0,
  };

  return of(mockPage).pipe(delay(1000));
}
