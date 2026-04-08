import { Game } from '../models/game.model';

export const MOCK_GAMES: Game[] = [
  {
    identifier: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'Local two-player classic on a shared device.',
    status: 'available',
    route: '/games/tic-tac-toe',
  },
  {
    identifier: 'connect-four',
    title: 'Connect Four',
    description: 'Drop discs to connect four — coming in a future module.',
    status: 'coming_soon',
    route: '/games/connect-four',
  },
];
