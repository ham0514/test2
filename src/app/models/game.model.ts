export type GameStatus = 'available' | 'coming_soon';

export interface Game {
  title: string;
  description: string;
  status: GameStatus;
  route: string;
  identifier: string;
}

export type PlayerMark = 'X' | 'O';

export type CellMark = PlayerMark | '';

export type TicTacToeGameStatus = 'active' | 'won' | 'draw';

export interface TicTacToeState {
  board: CellMark[];
  currentPlayer: PlayerMark;
  gameStatus: TicTacToeGameStatus;
  winner: PlayerMark | null;
  isDraw: boolean;
}
