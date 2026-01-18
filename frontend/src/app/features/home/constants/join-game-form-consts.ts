import { JoinGameFormConsts } from '@/app/features/home/types/join-game-form-consts';

export const JOIN_GAME_FORM_CONSTRAINTS: JoinGameFormConsts = {
  MIN: 100000,
  MAX: 999999,
} as const;
